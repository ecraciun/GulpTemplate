//import * as path from "path";
"use strict";
var envConfig = {
    ENV: process.env.NODE_ENV || "dev",
    PORT: process.env.PORT || '3000',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/gulptemplate'
};
module.exports = envConfig;
