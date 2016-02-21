var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var logger = require('../helpers/logger');
var index = require('../routes/index');
var appConfig = express();
// view engine setup
appConfig.set('views', path.join(__dirname, 'views'));
appConfig.set('view engine', 'ejs');
//app.set('view options', { layout: false });
appConfig.use(bodyParser.urlencoded({ extended: true }));
appConfig.use(bodyParser.json());
// Routes
appConfig.use('/assets', express.static(__dirname + '/../../client'));
appConfig.use('/', index);
// catch 404 and forward to error handler
appConfig.use(function (req, res, next) {
    var err = new Error('404 Not Found: ' + req.url);
    logger.info(err);
    next(err);
});
module.exports = appConfig;
