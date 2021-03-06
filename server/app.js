"use strict";
const http = require("http");
const app = require("./config/appConfig");
const envConfig = require("./config/envConfig");
const errorHandler = require("errorhandler");
const logger = require('./helpers/logger');
const db = require('./data/helpers/mongoHelper');
// error handlers
if (envConfig.ENV === 'dev') {
    app.use(errorHandler());
}
db.set('test', 'abc');
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
var port = normalizePort(envConfig.PORT);
app.set('port', port);
var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
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
exports.App = app;
