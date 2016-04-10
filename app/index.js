/**
 * Initial app bootstraping
 */

var express = require('express');
var path = require('path');
var app = express();
var compression = require('compression');

//compress compressable
app.use(compression({
    level: -1
}));

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/client/templates'));
app.use(express.static('public'));

// Setting up glopal scope methods
// recommended: just logger, metrics and config
global.quantum = {}; // Namespace
global.quantum.config = require('./config');
global.quantum.logger = require('./plugins/logger.js');


module.exports = app;
