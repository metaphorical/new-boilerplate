const logger = global.quantum.logger;

var algoliasearch = require('algoliasearch');


const algoliaService =  function(options) {
	var client = algoliasearch(options.applicationId, options.apiKey);
    return {
		getAlgoliaModel: (index) => {
			var index = client.initIndex(index);	
			return {
				search: (text) => {
					logger.info('Fetching results for query :', text);
					return new Promise((resolve, reject) => {
						index.search(text, function searchDone(err, content) {
							if(err) {
								reject(err);
							} else {
								resolve(content);
							}
						});
					});
				}	
			};
		}
    };
};

module.exports = algoliaService;
