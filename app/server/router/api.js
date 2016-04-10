/**
*
* API subrouter
*
**/
var router = require('express').Router();

var searchCtrl = require('../controllers/api/searchController.js');

router.get('/games/search/:text', searchCtrl.searchBoardGame);


module.exports = router;
