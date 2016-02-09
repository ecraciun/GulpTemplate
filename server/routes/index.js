var express = require("express");
function index(req, res) {
    var router = express.Router();
    console.log("Request: " + JSON.stringify(req.url));
    /* GET home page. */
    router.get('/', function (req, res, next) {
        //res.render('index', { title: 'Express' });
        res.write("Hello world!");
    });
}
exports.index = index;
;
