System.register(["http", "./config/appConfig", "./config/envConfig", "errorhandler", './helpers/logger', './data/helpers/mongoHelper'], function(exports_1) {
    var http, app, envConfig, errorHandler, logger, db;
    var port, server, App;
    //console.log(db.get('test'));
    function normalizePort(val) {
        var port = parseInt(val, 10);
        if (isNaN(port)) {
            // named pipe
            return val;
        }
        if (port >= 0) {
            // port number
            return port;
        }
        return false;
    }
    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error) {
        logger.error(error);
        if (error.syscall !== 'listen') {
            throw error;
        }
        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                logger.info(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                logger.info(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? `pipe ${addr}`
            : `port ${addr.port}`;
        logger.info(`Listening on ${bind}`);
    }
    return {
        setters:[
            function (http_1) {
                http = http_1;
            },
            function (app_1) {
                app = app_1;
            },
            function (envConfig_1) {
                envConfig = envConfig_1;
            },
            function (errorHandler_1) {
                errorHandler = errorHandler_1;
            },
            function (logger_1) {
                logger = logger_1;
            },
            function (db_1) {
                db = db_1;
            }],
        execute: function() {
            // error handlers
            if (envConfig.ENV === 'dev') {
                app.use(errorHandler());
            }
            db.set('test', 'abc');
            var port = normalizePort(envConfig.PORT);
            app.set('port', port);
            var server = http.createServer(app);
            /**
             * Listen on provided port, on all network interfaces.
             */
            server.listen(port);
            server.on('error', onError);
            server.on('listening', onListening);
            App = app;
        }
    }
});
