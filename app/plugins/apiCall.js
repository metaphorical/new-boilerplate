var http = require('http');


var apiCall = function(options, callback) {
    console.log('A:L========================================');
    http.request(options, callback);

};

module.exports = apiCall;
