const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    let roomID = '';
    let publicRoom = false;
    if(req.body['room_id']){
        roomID = req.body['room_id'];
        publicRoom = false;
    }else{
        roomID = '';
        publicRoom = true;
    }
    let usrName = req.body['name'];
    req.session.username = usrName;
    let data = {
        roomID: roomID,
        usrName: usrName,
        isPublic: publicRoom
    };
    res.render('matching', data);
});

module.exports = router;