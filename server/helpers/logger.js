System.register(['bunyan', '../config/envConfig'], function(exports_1) {
    var bunyan, envConfig;
    var logger;
    return {
        setters:[
            function (bunyan_1) {
                bunyan = bunyan_1;
            },
            function (envConfig_1) {
                envConfig = envConfig_1;
            }],
        execute: function() {
            var logger = bunyan.createLogger({
                name: 'gulptemplate',
                src: envConfig.ENV === 'dev' ? true : false,
                streams: [{
                        type: 'rotating-file',
                        path: `${__dirname}/../../../gulptemplate_logs/gulptemplate.log`,
                        count: 7,
                        period: '1d'
                    }]
            });
        }
    }
});
