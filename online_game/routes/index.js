const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('mydb.sqlite3', err => {
    if (err) {
        console.log('cannot connect server')
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }
});

/* GET home page. */
router.get('/', function (req, res, next) {
    let data = {
        isPost:false,
        usrName:'',
        roomID:''
    };
    res.render('index',data);
});

router.post('/',function(req,res,next) {
    const mail = req.body['mail'];
    const content = req.body['content'];
    db.serialize(() =>{
        db.run('CREATE TABLE IF NOT EXISTS contacts (\n' +
            '  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\n' +
            '  mail_address TEXT NOT NULL,\n' +
            '  input_text TEXT NOT NULL\n' +
            ');');
        db.run('insert into contacts (mail_address,input_text) values (?,?)',mail,content);
    });
    res.render('index');
});
module.exports = router;
