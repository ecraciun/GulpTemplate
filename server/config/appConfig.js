System.register(["express", "path", "body-parser", '../helpers/logger', '../routes/index'], function(exports_1) {
    var express, path, bodyParser, logger, index;
    var favicon, appConfig;
    return {
        setters:[
            function (express_1) {
                express = express_1;
            },
            function (path_1) {
                path = path_1;
            },
            function (bodyParser_1) {
                bodyParser = bodyParser_1;
            },
            function (logger_1) {
                logger = logger_1;
            },
            function (index_1) {
                index = index_1;
            }],
        execute: function() {
            var favicon = require('serve-favicon');
            var appConfig = express();
            // view engine setup
            appConfig.set('views', path.join(__dirname, '/../views'));
            appConfig.set('view engine', 'ejs');
            //app.set('view options', { layout: false });
            appConfig.use(bodyParser.urlencoded({ extended: true }));
            appConfig.use(bodyParser.json());
            // Routes
            appConfig.use(favicon(__dirname + '/../../client/images/favicon.ico'));
            appConfig.use('/assets', express.static(__dirname + '/../../client'));
            appConfig.use('/', index);
            // catch 404 and forward to error handler
            appConfig.use(function (req, res, next) {
                var err = new Error('404 Not Found: ' + req.url);
                logger.info(err);
                next(err);
            });
        }
    }
});
