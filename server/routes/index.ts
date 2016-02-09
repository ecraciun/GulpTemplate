import express = require("express");

export function index(req: express.Request, res: express.Response) {
    var router = express.Router();

    console.log("Request: " + JSON.stringify(req.url));
        
    /* GET home page. */
    router.get('/', function(req, res, next) {
        //res.render('index', { title: 'Express' });
        res.write("Hello world!");
    });
};