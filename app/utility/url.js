const Querystring = require('querystring');
module.exports =  {
	urlGeneratorFactory(options) {
		var mandatory = options.mandatory || [];
		var mandatoryInRest = options.mandatoryInRest || false;
		var restIncludesName = options.restIncludesName || false;
		var restParamSeparator = options.restSeparator || '-';
		return function(params, urlPrefix) {
                    var result = {};
                    var resultUrl  = urlPrefix;
                    var valid = true;
                    mandatory.map((field) => {
                        if(!params[field]) {
                            valid = false;
                            result = {
                                valid: false,
                                error: {
                                    message: field + " is mandatory"
                                }
                            };
                        } else if(mandatoryInRest) {
                            params[field] = params[field].replace(' ', '+');
                            if(restIncludesName) {
                                resultUrl += '/' + field + restParamSeparator + params[field];
                            } else {
                                resultUrl += '/' + params[field];
                            }
                            delete params[field];
                        }
                    });
                    if (valid) {
                        Object.keys(params).map((key) => {
                            if (params[key] === null) {
                                delete params[key];
                            }
                        });
                        if (Object.keys(params).length > 0) {
                            resultUrl += '?' + Querystring.stringify(params);
                        }
                        result = {
                            valid: true,
                            url: resultUrl
                        };
                    }
                    return result;
                }
	}
}