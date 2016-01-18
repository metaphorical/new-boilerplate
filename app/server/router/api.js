/**
*
* API subrouter
*
**/

var router = require('express').Router();


var moviesCtrl = require('../controllers/api/movies.js');


router.get('/title/:title', moviesCtrl.getByTitle);
router.get('/detail/:imdbid', moviesCtrl.getById);
router.get('/search/:title', moviesCtrl.searchByTitle);


module.exports = router;
