const Pieces = document.getElementById("mainTable");
let initialized = false
let operator = 1;
let currentCoordinate = [6, 6];
let currentNumber = 0;
let moveNumber = 0;
let moveCoordinate = [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];

function setText(x, y, msg) {
    Pieces.rows[y].cells[x].innerText = msg;
}

function getText(x, y) {
    return Pieces.rows[y].cells[x].textContent;
}

function setClass(x, y, msg) {
    Pieces.rows[y].cells[x].className = msg;
}

function addPiece(){
    moveNumber++;
    for(let i = 10;i > 0;i--){
        moveCoordinate[0][i] = moveCoordinate[0][i - 1];
        moveCoordinate[1][i] = moveCoordinate[1][i - 1];
    }
    moveCoordinate[0][0] = currentCoordinate[0];
    moveCoordinate[1][0] = currentCoordinate[1];
    let i = moveCoordinate[0][10];
    let j = moveCoordinate[1][10];
    console.log(moveCoordinate);
    if(moveNumber === 10){
        let a = Math.floor(Math.random() * 10);
        setText(6, 6, a.toString());
        setClass(6, 6, "NumberPiece");
    }
    if(moveNumber >= 11){
        if (i % 2 === 0 && j % 2 === 1) {
            let a = Math.floor(Math.random() * 2);
            switch(a){
                case 0: setText(i, j, "+");break;
                case 1: setText(i, j, "-");break;
            }
            setClass(i, j, "OperatorPiece");
        } else if (i % 2 === 1 && j % 2 === 0) {
            let a = Math.floor(Math.random() * 2);
            if (a === 0) {
                setText(i, j, "+");
            } else {
                setText(i, j, "-");
            }
            setClass(i, j, "OperatorPiece")
        }else {
            let a = Math.floor(Math.random() * 9) + 1;
            setText(i, j, a.toString());
            setClass(i, j, "NumberPiece");
        }
    }
}

function getLeftKey() {
    if (currentCoordinate[0] > 0) {
        if (getText(currentCoordinate[0] - 1, currentCoordinate[1]) !== "") {
            if (getText(currentCoordinate[0] - 1, currentCoordinate[1]) === "+") {
                operator = 0;
                setClass(currentCoordinate[0] - 1, currentCoordinate[1], "SelectPlusPiece");
            } else if (getText(currentCoordinate[0] - 1, currentCoordinate[1]) === "-") {
                operator = 1;
                setClass(currentCoordinate[0] - 1, currentCoordinate[1], "SelectMinusPiece");
            }else {
                if (operator === 0) {
                    currentNumber += parseInt(getText(currentCoordinate[0] - 1, currentCoordinate[1]));
                } else if(operator === 1) {
                    currentNumber -= parseInt(getText(currentCoordinate[0] - 1, currentCoordinate[1]));
                }
                setClass(currentCoordinate[0] - 1, currentCoordinate[1], "SelectNumberPiece");
            }
            setClass(currentCoordinate[0], currentCoordinate[1], "DeletedPiece");
            setText(currentCoordinate[0], currentCoordinate[1], "");
            currentCoordinate[0]--;
            setText(currentCoordinate[0], currentCoordinate[1], currentNumber.toString());
            addPiece();
        }
    }
    judge();
}

function getRightKey() {
    if (currentCoordinate[0] < 12) {
        if (getText(currentCoordinate[0] + 1, currentCoordinate[1]) !== "") {
            if (getText(currentCoordinate[0] + 1, currentCoordinate[1]) === "+") {
                operator = 0;
                setClass(currentCoordinate[0] + 1, currentCoordinate[1], "SelectPlusPiece");
            } else if (getText(currentCoordinate[0] + 1, currentCoordinate[1]) === "-") {
                operator = 1;
                setClass(currentCoordinate[0] + 1, currentCoordinate[1], "SelectMinusPiece");
            }else {
                if (operator === 0) {
                    currentNumber += parseInt(getText(currentCoordinate[0] + 1, currentCoordinate[1]));
                } else if(operator === 1) {
                    currentNumber -= parseInt(getText(currentCoordinate[0] + 1, currentCoordinate[1]));
                }
                setClass(currentCoordinate[0] + 1, currentCoordinate[1], "SelectNumberPiece");
            }
            setClass(currentCoordinate[0], currentCoordinate[1], "DeletedPiece");
            setText(currentCoordinate[0], currentCoordinate[1], "");
            currentCoordinate[0]++;
            setText(currentCoordinate[0], currentCoordinate[1], currentNumber.toString());
            addPiece();
        }
    }
    judge();
}

function getUpKey() {
    if (currentCoordinate[1] > 0) {
        if (getText(currentCoordinate[0], currentCoordinate[1] - 1) !== "") {
            if (getText(currentCoordinate[0], currentCoordinate[1] - 1) === "+") {
                operator = 0;
                setClass(currentCoordinate[0], currentCoordinate[1] - 1, "SelectPlusPiece");
            } else if (getText(currentCoordinate[0], currentCoordinate[1] - 1) === "-") {
                operator = 1;
                setClass(currentCoordinate[0], currentCoordinate[1] - 1, "SelectMinusPiece");
            }else {
                if (operator === 0) {
                    currentNumber += parseInt(getText(currentCoordinate[0], currentCoordinate[1] - 1));
                } else if(operator === 1) {
                    currentNumber -= parseInt(getText(currentCoordinate[0], currentCoordinate[1] - 1));
                }
                setClass(currentCoordinate[0], currentCoordinate[1] - 1, "SelectNumberPiece");
            }
            setClass(currentCoordinate[0], currentCoordinate[1], "DeletedPiece");
            setText(currentCoordinate[0], currentCoordinate[1], "");
            currentCoordinate[1]--;
            setText(currentCoordinate[0], currentCoordinate[1], currentNumber.toString());
            addPiece();
        }
    }
    judge();
}

function getDownKey() {
    if (currentCoordinate[1] < 12) {
        if (getText(currentCoordinate[0], currentCoordinate[1] + 1) !== "") {
            if (getText(currentCoordinate[0], currentCoordinate[1] + 1) === "+") {
                operator = 0;
                setClass(currentCoordinate[0], currentCoordinate[1] + 1, "SelectPlusPiece");
            } else if (getText(currentCoordinate[0], currentCoordinate[1] + 1) === "-") {
                operator = 1;
                setClass(currentCoordinate[0], currentCoordinate[1] + 1, "SelectMinusPiece");
            }else {
                if (operator === 0) {
                    currentNumber += parseInt(getText(currentCoordinate[0], currentCoordinate[1] + 1));
                } else if(operator === 1) {
                    currentNumber -= parseInt(getText(currentCoordinate[0], currentCoordinate[1] + 1));
                }
                setClass(currentCoordinate[0], currentCoordinate[1] + 1, "SelectNumberPiece");
            }
            setClass(currentCoordinate[0], currentCoordinate[1], "DeletedPiece");
            setText(currentCoordinate[0], currentCoordinate[1], "");
            currentCoordinate[1]++;
            setText(currentCoordinate[0], currentCoordinate[1], currentNumber.toString());
            addPiece();
        }
    }
    judge();
}

function initialize() {
    if (!initialized) {
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 13; j++) {
                if (i % 2 === 0 && j % 2 === 1) {
                    let a = Math.floor(Math.random() * 2);
                    switch(a){
                        case 0: setText(i, j, "+");break;
                        case 1: setText(i, j, "-");break;
                    }
                    setClass(i, j, "OperatorPiece");
                }else if (i % 2 === 1 && j % 2 === 0) {
                    let a = Math.floor(Math.random() * 2);
                    switch(a){
                        case 0: setText(i, j, "+");break;
                        case 1: setText(i, j, "-");break;
                    }
                    setClass(i, j, "OperatorPiece");
                } else if (i === 6 && j === 6) {
                    currentNumber = 0;
                    setText(i, j, 0);
                    setClass(i, j, "SelectNumberPiece")
                } else {
                    let a = Math.floor(Math.random() * 9) + 1;
                    setText(i, j, a.toString());
                    setClass(i, j, "NumberPiece")
                }
            }
        }
        currentCoordinate[0] = 6;
        currentCoordinate[1] = 6;
        moveNumber = 0;
        moveCoordinate = [[-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1]];
        initialized = true;
    }
}

function judge() {
    if (currentNumber === 0 && moveNumber > 1) {
        setTimeout(function() {
            alert("game cleared!");
        }, 100);
        initialized = false;
        setTimeout(function() {
            initialize();
        }, 100);
        return;
    }
    let sum = 0;
    if (currentCoordinate[0] <= 0) {
        sum++;
    } else if (getText(currentCoordinate[0] - 1, currentCoordinate[1]) === "") {
        sum++;
    }
    if (currentCoordinate[0] >= 12) {
        sum++;
    } else if (getText(currentCoordinate[0] + 1, currentCoordinate[1]) === "") {
        sum++;
    }
    if (currentCoordinate[1] <= 0) {
        sum++;
    } else if (getText(currentCoordinate[0], currentCoordinate[1] - 1) === "") {
        sum++;
    }
    if (currentCoordinate[1] >= 12) {
        sum++;
    } else if (getText(currentCoordinate[0], currentCoordinate[1] + 1) === "") {
        sum++;
    }
    if (sum === 4) {
        setTimeout(function() {
            alert("you lose!");
        }, 100);
        initialized = false;
        setTimeout(function() {
            initialize();
        }, 100);
    }
}

document.addEventListener('keydown', (e) => {
    console.log("input!!");
    console.log(currentCoordinate)
    switch (e.code) {
        case "ArrowLeft":
            getLeftKey();
            break;
        case "ArrowRight":
            getRightKey();
            break;
        case "ArrowUp":
            getUpKey();
            break;
        case "ArrowDown":
            getDownKey();
            break;
    }
    console.log(currentNumber);
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
        switch(swipeDirection){
            case "right": getRightKey();break;
            case "left": getLeftKey();break;
            case "up": getUpKey();break;
            case "down": getDownKey();break;
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

initialize();