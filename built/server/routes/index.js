var express = require("express");
function index(req, res) {
    var router = express.Router();
    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index', { title: 'Express' });
    });
}
exports.index = index;
;
