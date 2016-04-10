/**
 * Node js 4+ is optimal for this app, but it will work on lower versions with polyfill
 */
if (Number(process.version.match(/^v(\d+\.\d+)/)[1]) < 4) {
    // To get all the ES2015 fun stuff in 0.12
    // ES6 everywhere - remove when on node that supports all you need
    // It will probably be never :)
    require('babel-core/register')({
        presets: ['es2015']
    });
    // ... and to get Promises
    require("babel-polyfill");
}

var app = require('./app');
var pagesRouter = require('./app/server/router/pages.js');
//API router
var apiRouter = require('./app/server/router/api.js');

var logger = global.quantum.logger;

// Routing pages
pagesRouter(app);

app.use(function (req, res, next) {
  logger.info('Time: %d', Date.now());
  next();
});

//Attaching API subrouter and versioning the API
//This is just for testing purposes since all teh data is planed ot be handled through falcor router
app.use('/api/v1/', apiRouter);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    logger.info('App listening at http://%s:%s', host, port);
});
