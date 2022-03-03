var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt')
const saltRounds = 10

var jwt = require('jsonwebtoken')
const secretodeamor = 'ferremateriales-elbosque'

app.use(cors())

const connection = require('./database/db.js')

app.post('/register', jsonParser, function(req, res, next){

    bcrypt.hash(req.body.passwd, saltRounds, function(err, passwdhash) {

        connection.execute(
            'INSERT INTO users (name, username, passwd) VALUES (?,?,?)',
            [req.body.name, req.body.username, passwdhash],
            function(err, results, fields) {
             
                if(err){
                    res.json({status: 'error', message: err})
                    return
                }
                res.json({status: 'ok' })
            }
          );
    });
   
})

app.post('/login', jsonParser, function(req, res, next){

    connection.execute(
        'SELECT * FROM users WHERE username=?',
        [req.body.username],
        function(err, users, fields) {
         
            if(err){res.json({status: 'error', message: err}); return }
            if(users.length == 0){res.json({status: 'error', message: 'no user found'}); return }
            bcrypt.compare(req.body.passwd, users[0].passwd, function(err, isLogin) {
               if(isLogin){
                var token = jwt.sign({ username: users[0].username }, secretodeamor, { expiresIn: '1h' });
                res.json({status: 'ok', message: 'login success', token})
               }else{
                res.json({status: 'error', message: 'login failed'})
               }
            });
           
        }
      );
})

app.post('/authen', jsonParser, function(req, res, next){
    try{
        const token =req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secretodeamor)
        res.json({status: 'ok', decoded})
        
    }catch(err){
        res.json({status: 'error', message: err.message})
    }
   
})




app.listen(3333, jsonParser, function () {
  console.log('CORS-enabled web server listening on port 3333')
})