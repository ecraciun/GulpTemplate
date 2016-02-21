import * as bunyan from 'bunyan'
import * as envConfig from '../config/envConfig'

var logger = bunyan.createLogger(
    {
        name: 'gulptemplate',
        src: envConfig.ENV === 'dev' ? true : false,
        streams: [{
            type: 'rotating-file',
            path: `${__dirname}/../../../gulptemplate_logs/gulptemplate.log`,
            count: 7,
            period: '1d'
        }]
    });
    
export = logger;