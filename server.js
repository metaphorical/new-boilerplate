var app = require('./app');
var nock = require('nock');

var apiCall = require('./app/plugins/apiCall.js');

var couchdb = nock('http://myapp.metacouch.com')
    .get('/users/1')
    .reply(200, {
        _id: '123ABC',
        _rev: '946B7D1C',
        username: 'metaphorical',
        email: 'rastko.vukasinovic@gmail.com'
});
nock.enableNetConnect();


app.get('/', function (req, res) {
    apiCall({
        hostname: 'http://myapp.metacouch.com',
        path: '/user/1'

    }, function(data){
        res.write(data);
    });
    res.end('Hello World!');
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
