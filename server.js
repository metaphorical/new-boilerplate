var app = require('./app');

var apiCall = require('./app/plugins/apiCall.js');



app.get('/', function (req, res) {
    apiCall({
        host: 'www.omdbapi.com',
        path: '/?t=arrow&y=&plot=short&r=json'

    }, function(err, data){
        if (!err) {
            res.send(data);
        } else {
            console.log('ERROR', err);
        }
    });
});

app.use(function (req, res, next) {
  console.log('Time: %d', Date.now());
  next();
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
