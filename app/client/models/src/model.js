const reqwest = require('reqwest');
const Immutable = require('immutable');
const urlUtils = require('../../../utility/url.js');
/**
 * Basic client side model factory
 * @param  {Object} options
 * Options you can pass:
 * 		* url - url for data endpoint model uses
 *  	* mandatory - {Array} - mandatory fields
 *  	* mandatoryInRest - {Boolean} - if mandatory fields are parsed in rest Params
 *  	* restIncludesName - {Boolean} - if rest param should include name + separator + value
 *  		(e.g. in search we got /location-new+york?other params)
 *  	* restParamSeparator - {String} - what separates name and value in rest if above si true
 *
 * @return {Object} Client side model
 */
var model = function(options) {
    // @TODO: Maybe add name for logging purposes?
    if (typeof options === 'undefined') {
        //@TODO This gets logged with devtool we are building in [VRE-26]
        console.log('You have to have options object and it has to contain at least url for model');
    }
    var mandatory = options.mandatory || [];
    var mandatoryInRest = options.mandatoryInRest || false;
    var restIncludesName = options.restIncludesName || false;
    var restParamSeparator = options.restSeparator || '-';
    var apiUrl = options.apiUrl || null;
    var url = options.url || null;
    var _data = null;
    var requestUrl = '';
    /**
     *  @TODO: maybe create cache/store method that stores model by its md5 or smt...
     *
     *       this would allow us to have caching done on model level
     *        In this case, when you fetch, data gets stored in model's state, and gets overwritten on every fetch,
     *        if we can command it to
     *        store and get hash given to us, we'd be easily be able ot store multiple searches
     * @TODO: dry this and allow for multiple error messages, meaning, do not return error as soon as it happens but acummulate
     *        and then return
     * @TODO: extract url generation to plugin
     */
     return {
        getUrl: urlUtils.urlGeneratorFactory(options),
        getApiUrl: function(params) {
            if (apiUrl) {
                return this.getUrl(params, apiUrl);
            } else {
                return {
                    error: {
                        message: 'No API url provided'
                    }
                };
            }
        },
        getPageUrl: function(params) {
            if (apiUrl) {
                return this.getUrl(params, url);
            } else {
                return {
                    error: {
                        message: 'No page url provided'
                    }
                };
            }
        },
        fetch: function(params) {
            return new Promise((resolve, reject) => {
                var doRequest = true;
                // Here we are checking if all mandatory fiealds are present and also building the link
                mandatory.map((field) => {
                    if(!params[field]) {
                        // Double safety to prevent request if mandatory field is missing
                        doRequest = false;
                        reject({
                            message: field + " is mandatory"
                        });
                    } else if(mandatoryInRest) {
                        if(restIncludesName) {
                            requestUrl = apiUrl + '/' + field + restParamSeparator + params[field];
                        } else {
                            requestUrl = apiUrl + '/' + params[field];
                        }
                        delete params[field];
                    }
                });
                if (doRequest) {
                    reqwest({
                        url: requestUrl,
                        method: 'get',
                        data: Object.keys(params).map((key) => {
                            return {
                                name: key,
                                value: params[key]
                            };
                        }),
                        success: (response) => {
                            _data = Immutable.fromJS(response);
                            resolve(_data);
                        },
                        error: (error) => reject(error)
                    });
                }
            });
        },
        getData: function() {
            return _data;
        }
    };
};


module.exports = model;
