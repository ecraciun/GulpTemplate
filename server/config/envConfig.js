//import * as path from "path";
System.register([], function(exports_1) {
    var envConfig;
    return {
        setters:[],
        execute: function() {
            var envConfig = {
                ENV: process.env.NODE_ENV || "dev",
                PORT: process.env.PORT || '3000',
                MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/gulptemplate'
            };
        }
    }
});
