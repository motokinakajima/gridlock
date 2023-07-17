let operatorOnline = 0;
let currentNumberOnline = 0;
let sumTurns = 0;
let turns = 0;
let isMyTurn = false;
let currentCoordinateOnline = [];
let arrayData = [];
let arrayCss = [];
let roomKey = '';
let partnerName = '';
let taboo_number = 0;
const move_audio = document.getElementById('move');
const cannot_move_audio = document.getElementById('cannot_move');
const socket = io();
socket.emit('join-room', RoomID, UsrName,IsPublic);
socket.on('start-game',(names) =>{
    if(names[0] === UsrName){
        alert(`matched with ${names[1]}`);
    }else{
        alert(`matched with ${names[0]}`);
    }
})
socket.on('playerLeft',() =>{
    const title = document.getElementById('Title');
    title.innerText = 'matching';
    const image = document.getElementById('loadingImage');
    image.style.display = "block";
    const p = document.getElementById('errMessage');
    p.innerText = `A player left room`;
    const turn = document.getElementById('turn');
    turn.innerText = '';
    const wait = document.getElementById('wait');
    wait.innerText = 'Waiting for other players';
    const tabooP = document.getElementById('tabooP');
    tabooP.innerText = '';
    const table = document.getElementById('socketTable');
    table.style.display = 'none';
    socket.emit('leave-room');
    socket.emit('join-room', RoomID, UsrName,IsPublic);
});
socket.on('err', (err_message) => {
    const title = document.getElementById('Title');
    title.innerText = 'err';
    const image = document.getElementById('loadingImage');
    image.style.display = "none";
    const p = document.getElementById('errMessage');
    p.innerText = err_message;
    const wait = document.getElementById('wait');
    wait.innerText = '';
    const tabooP = document.getElementById('tabooP');
    tabooP.innerText = '';
    const table = document.getElementById('socketTable');
    table.style.display = 'none';
});
socket.on('send-data', (taboo,players,key,data,cssData,turn,current,number,currentNumber,operator,prev) => {
    currentCoordinateOnline = current;
    arrayData = data;
    turns = turn;
    arrayCss = cssData;
    sumTurns = number;
    currentNumberOnline = currentNumber;
    operatorOnline = operator;
    roomKey = key;
    taboo_number = taboo;
    if(players[0] === UsrName){
        partnerName = players[1];
    }else{
        partnerName = players[0];
    }
    let existingTable = document.getElementById('socketTable');
    existingTable.style.display = 'table';
    let tbody = document.createElement('tbody');
    for (let i = 0; i < data.length; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < data[i].length; j++) {
            let cell = document.createElement('td');
            cell.innerText = data[i][j];
            cell.className = cssData[i][j];
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    existingTable.replaceChild(tbody, existingTable.tBodies[0]);
    const p = document.getElementById('turn');
    if (turn === UsrName) {
        isMyTurn = true;
        p.innerText = 'your turn';
    } else {
        isMyTurn = false;
        p.innerText = `${partnerName}'s turn`;
    }
    const content = document.getElementById('content');
    content.appendChild(p);
    let judgeNumber = judge();
    if(prev === UsrName){
        switch(judgeNumber){
            case 1: socket.emit('clear-game',key,prev);break;
            case 2: socket.emit('dead-game',key,prev);break;
        }
    }
    const err = document.getElementById('errMessage');
    err.innerText = '';
    const wait = document.getElementById('wait');
    wait.innerText = '';
    const image = document.getElementById('loadingImage');
    image.style.display = "none";
    const title = document.getElementById('Title');
    title.innerText = 'GridLock';
    const tabooP = document.getElementById('tabooP');
    tabooP.innerText = `You cannot make the number to ${taboo_number}`;
});
socket.on('client-clear',(playerName) =>{
    const title = document.getElementById('Title');
    const image = document.getElementById('loadingImage');
    const p = document.getElementById('errMessage');
    const turn = document.getElementById('turn');
    const wait = document.getElementById('wait');
    const table = document.getElementById('socketTable');
    const tabooP = document.getElementById('tabooP');
    setTimeout(function() {
        title.innerText = 'matching';
        image.style.display = "block";
        p.innerText = 'Game ended';
        turn.innerText = '';
        wait.innerText = 'Waiting for other players';
        table.style.display = 'none';
        tabooP.innerText = '';
    }, 100);
    if(UsrName === playerName){
        alert("you win!!");
    }else{
        alert("you lost!");
    }
    let result = confirm("Do you want to play again?");
    if (result === true) {
        socket.emit('leave-room');
        socket.emit('join-room', RoomID, UsrName,IsPublic);
    } else {
        fetch('/');
    }
});
socket.on('client-dead',(playerName) =>{
    const title = document.getElementById('Title');
    const image = document.getElementById('loadingImage');
    const p = document.getElementById('errMessage');
    const turn = document.getElementById('turn');
    const wait = document.getElementById('wait');
    const table = document.getElementById('socketTable');
    const tabooP = document.getElementById('tabooP');
    setTimeout(function() {
        title.innerText = 'matching';
        image.style.display = "block";
        p.innerText = 'Game ended';
        turn.innerText = '';
        wait.innerText = 'Waiting for other players';
        table.style.display = 'none';
        tabooP.innerText = '';
    }, 100);
    if(UsrName === playerName){
        alert("you lost!");
    }else{
        alert("you win!!");
    }
    let result = confirm("Do you want to play again?");
    if (result === true) {
        socket.emit('leave-room');
        socket.emit('join-room', RoomID, UsrName,IsPublic);
    } else {
        fetch('/');
    }
});
document.addEventListener('keydown', (e) => {
    if(isMyTurn === true){
        switch (e.code) {
            case "ArrowUp":getUp();break;
            case "ArrowDown":getDown();break;
            case "ArrowLeft":getLeft();break;
            case "ArrowRight":getRight();break;
        }
    }else{
        cannot_move_audio.play();
    }
});
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const userAgent = navigator.userAgent;
if (userAgent.match(/Android/i)
    || userAgent.match(/webOS/i)
    || userAgent.match(/iPhone/i)
    || userAgent.match(/iPad/i)
    || userAgent.match(/iPod/i)
    || userAgent.match(/BlackBerry/i)
    || userAgent.match(/Windows Phone/i)
) {
    document.addEventListener("touchstart", function(event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }, false);
    document.addEventListener("touchend", function(event) {
        touchEndX = event.changedTouches[0].clientX;
        touchEndY = event.changedTouches[0].clientY;
        const swipeDirection = detectSwipeDirection();
        if(isMyTurn){
            switch(swipeDirection){
                case "right": getRight();break;
                case "left": getLeft();break;
                case "up": getUp();break;
                case "down": getDown();break;
            }
        }else{
            cannot_move_audio.play();
        }
    }, false);
    function detectSwipeDirection() {
        const xDiff = touchEndX - touchStartX;
        const yDiff = touchEndY - touchStartY;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            return xDiff > 0 ? "right" : "left";
        } else {
            return yDiff > 0 ? "down" : "up";
        }
    }
}
function getUp(){
    if(currentCoordinateOnline[0] > 0){
        if(arrayData[currentCoordinateOnline[0] - 1][currentCoordinateOnline[1]] !== ''){
            move_audio.play();
            socket.emit('key-input',roomKey,UsrName,arrayData,arrayCss,currentCoordinateOnline,sumTurns,'up',currentNumberOnline,operatorOnline,taboo_number);
        }
    }
}
function getDown(){
    if(currentCoordinateOnline[0] < arrayData.length - 1){
        if(arrayData[currentCoordinateOnline[0] + 1][currentCoordinateOnline[1]] !== ''){
            move_audio.play();
            socket.emit('key-input',roomKey,UsrName,arrayData,arrayCss,currentCoordinateOnline,sumTurns,'down',currentNumberOnline,operatorOnline,taboo_number);
        }
    }
}
function getLeft(){
    if(currentCoordinateOnline[1] > 0){
        if(arrayData[currentCoordinateOnline[0]][currentCoordinateOnline[1] - 1] !== ''){
            move_audio.play();
            socket.emit('key-input',roomKey,UsrName,arrayData,arrayCss,currentCoordinateOnline,sumTurns,'left',currentNumberOnline,operatorOnline,taboo_number);
        }
    }
}
function getRight(){
    if(currentCoordinateOnline[1] < arrayData[0].length - 1){
        if(arrayData[currentCoordinateOnline[0]][currentCoordinateOnline[1] + 1] !== ''){
            move_audio.play();
            socket.emit('key-input',roomKey,UsrName,arrayData,arrayCss,currentCoordinateOnline,sumTurns,'right',currentNumberOnline,operatorOnline,taboo_number);
        }
    }
}
function judge(){
    if(currentNumberOnline === 0 && sumTurns > 2){
        return 1;
    }
    if(currentNumberOnline === taboo_number&& sumTurns > 1){
        return 2;
    }
    let sum = 0;
    if (currentCoordinateOnline[0] <= 0) {
        sum++;
    } else if (arrayData[currentCoordinateOnline[0] - 1][currentCoordinateOnline[1]] === "") {
        sum++;
    }
    if (currentCoordinateOnline[0] >= arrayData.length - 1) {
        sum++;
    } else if (arrayData[currentCoordinateOnline[0] + 1][currentCoordinateOnline[1]] === "") {
        sum++;
    }
    if (currentCoordinateOnline[1] <= 0) {
        sum++;
    } else if (arrayData[currentCoordinateOnline[0]][currentCoordinateOnline[1] - 1] === "") {
        sum++;
    }
    if (currentCoordinateOnline[1] >= arrayData[0].length - 1) {
        sum++;
    } else if (arrayData[currentCoordinateOnline[0]][currentCoordinateOnline[1] + 1] === "") {
        sum++;
    }
    if (sum === 4) {
        return 2;
    }else{
        return 0;
    }
}