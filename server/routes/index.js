"use strict";
const express = require("express");
var router = express.Router();
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function (req, res, next) {
    res.sendFile('client/index.html', { root: __dirname + '/../../' });
});
module.exports = router;
