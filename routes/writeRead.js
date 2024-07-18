'use strict';
const express = require('express');
const crypto = require('crypto');
const wrRoute = express.Router();
const connection = require('../db');

const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
//---------------------------post-----------------------------
wrRoute.post('/users', function (req, res, next) {
    let mypass = crypto.createHash("md5").update(req.body.password).digest("hex");

    connection.execute(`INSERT INTO Users_tbl 
        (id, name, surname, tel, tool, password)      
        VALUES (?, ?, ?, ?, ?,?);`,
        [req.body.id, req.body.name, req.body.surname,
            req.body.tel,req.body.tool,mypass]).then(() => {
            console.log('ok');
            res.status(201).send("Insert Successfully.");
        }).catch((err) => {
            console.log(err);
            res.end();
        });
});
//---------------------------get--------------------------------
wrRoute.get('/users', function (req, res, next) {
    connection.execute('SELECT * FROM Users_tbl;')
        .then((result) => {
            var rawData = result[0];
            //   res.send(JSON.stringify(rawData));
            res.send(rawData);
        }).catch((err) => {
            console.log(err);
            res.end();
        });

});
//----------------------------check-----------------------------
module.exports = wrRoute;
wrRoute.post('/check', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
    connection.execute('SELECT * FROM Users_tbl WHERE name=? AND password=?;',
        [req.body.username, mypass]).then((result) => {
            var data = result[0];
            if (data.length === 0) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        }).catch((err) => {
            console.log(err);
            res.sendStatus(404);
        });
});
wrRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
})
module.exports = wrRoute;