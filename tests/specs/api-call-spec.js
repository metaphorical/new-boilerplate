var nock = require('nock');

global.quantum = {};
global.quantum.logger = require('../../app/plugins/logger.js');
logger = global.quantum.logger;
var apiCall = require('../../app/plugins/apiCall.js');


var options = {
    protocol: 'http',
    hostname: 'www.fake-api.com',
    path: '/api/fake-router'
};

describe('API Call method response', function () {
                    nock('http://www.fake-api.com')
                            .get(options.path)
                            .reply(200, '{"dataPassed": true}')
                            .get(options.path)
                            .reply(400, 'error')
                            .get(options.path)
                            .reply(400, 'error')
                            .get(options.path)
                            .delay(2000)
                            .reply(400, 'error');


                    // global.quantum.logger.info = jasmine.createSpy("info() spy").andCallFake(function() {
                    //                                         console.log("Hello from info()");
                    //                                         return;
                    //                                     });
                    //
                    // global.quantum.logger.error = jasmine.createSpy("error() spy").andCallFake(function() {
                    //                                         console.log("Hello from error()");
                    //                                         return;
                    //                                     });

                    it ('should return data object on response success', function (done) {
                                apiCall(options, function (err, response) {
                                    expect(JSON.parse(response).dataPassed).toBe(true);
                                    done();
                                });

                    });

                    it ('should return error object on 400 error', function (done) {
                                apiCall(options, function (err, response) {
                                    expect(err.output).toBe('error');
                                    done();
                                });
                    });

                    it ('should trigger error logging on 400 error', function (done) {
                                spyOn(logger, "info");
                                apiCall(options, function (err, response) {
                                    expect(logger.info).toHaveBeenCalled();
                                    done();
                                });
                    });

                    it ('should trigger error logging with error string', function (done) {
                                spyOn(logger, "error");
                                apiCall(options, function (err, response) {
                                    expect(logger.error).toHaveBeenCalledWith('Error happened');
                                    done();
                                });
                    });
});
