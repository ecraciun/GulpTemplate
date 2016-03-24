"use strict";
const mongoose = require('mongoose');
const envConfig = require('../../config/envConfig');
const logger = require('../../helpers/logger');
mongoose.connect(envConfig.MONGO_URI, function (err) {
    logger.error(err);
});
var db = mongoose.connection;
db.on('error', function (error) {
    logger.error(error);
    throw error;
});
module.exports = mongoose;
// https://github.com/Appsilon/styleguide/wiki/mongoose-typescript-models
// https://gist.github.com/masahirompp/3c012c8721b70821fa45
// http://onoffswitch.net/mongoose-with-typescript/
// https://www.google.ro/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=moongoose%20and%20typescript 
//# sourceMappingURL=mongoHelper.js.map