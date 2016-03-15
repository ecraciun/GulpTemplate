System.register(["express"], function(exports_1) {
    var express;
    var router;
    return {
        setters:[
            function (express_1) {
                express = express_1;
            }],
        execute: function() {
            var router = express.Router();
            /* GET home page. */
            // router.get('/', function(req, res, next) {
            //   res.render('index', { title: 'Express' });
            // });
            router.get('/', function (req, res, next) {
                res.sendFile('client/index.html', { root: __dirname + '/../../' });
            });
        }
    }
});
