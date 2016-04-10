const AlgoliaService = require('../../services/algolia.js');
const credentials = quantum.config.creds;
// Initializing service interfacing to Algolia api
const algoliaService = AlgoliaService({
	applicationId: credentials.algolia.applicationId,
	apiKey: credentials.algolia.apiKey
});
const boardGamesService= algoliaService.getAlgoliaModel('board_games');
var searchController = {
    searchBoardGame: (req, res) => {
        var text =  req.params.text;
        boardGamesService.search(text).then((data) => {
            res.send(data);
        })
		.catch((err) => {
			quantum.logger.debug('search controller error', JSON.stringify(err, null, 4));
            res.send(JSON.parse(err));
        });
    }
};

module.exports = searchController;
