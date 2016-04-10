const model = require('./model.js');

const searchModel = new model({
    url: '/search',
    apiUrl: '/api/v1/games/search',
    mandatory: ['text'],
    mandatoryInRest: true
});

module.exports = searchModel;
