var http = require('http');
var https = require('https');

/**
 * Metod to manage api requests
 * @param {Object}   options  Options for nodejs http requests
 * @param {Function} callback executed on success or error
 * @param {bool}   expose   Flag to expose request object (to be able to write a body of request)
 */
var apiCall = function(options, callback, expose) {
    console.log('api call');

    // setup protocol based on passed parameters
    var protocol = (options.port && options.port === '443') ? https : http;

    var req = protocol.request(options, function(res) {
        var responseString = '';
        res.setEncoding('utf8');

        // concatinating the chunks
        res.on('data', function (chunk) {
            responseString += chunk;
        })

        // End usually means it was success
        .on('end', function() {
            callback(null, responseString);
        })


        .on('error', function(err) {
            callback(err, null);
        });
    });

    if (expose) {
        return req;
    } else {
        req.end();
    }

};

module.exports = apiCall;
