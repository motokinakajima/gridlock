const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('mydb.sqlite3');

const password = 'motokosama';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('auth');
});

router.post('/',function(req,res,next) {
    console.log('input_data = ',req.body['pass']);
    if(req.body['pass'] === password){
        db.serialize(()=>{
            db.all("select * from contacts",(err,rows)=>{
                if(!err){
                    let data = {
                        content: rows
                    }
                    res.render('developer',data);
                }
            });
        });
    }else{
        res.render('return');
    }
});
module.exports = router;