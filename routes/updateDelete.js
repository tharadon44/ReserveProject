'use strict';
const express = require('express');
const udRoute = express.Router();
const connection = require('../db');

//const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
//------------------------update---------------------------------
udRoute.put('/users/:uid', function (req, res, next) {
    connection.execute("UPDATE Users_tbl SET  id=?,  tel=? WHERE id=?;",
        [req.body.id, req.body.tel, req.params.uid])
        .then(() => {
            console.log('ok');
        }).catch((err) => {
            console.log(err);
        });
    res.status(200).send("Update Successfully.");
});
//------------------------delete---------------------------------
udRoute.delete('/users/:uid', function (req, res, next) {
    connection.execute("DELETE FROM Users_tbl WHERE id=?;",
        [req.params.uid])
        .then(() => {
            console.log('ok');
        }).catch((err) => {
            console.log(err);
        });
    res.end();
});

udRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
});
module.exports = udRoute;