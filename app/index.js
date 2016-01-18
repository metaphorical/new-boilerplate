/**
 * Initial app bootstraping
 */

var express = require('express');
var app = express();
var compression = require('compression');

//compress compressable
app.use(compression({
    level: -1
}));

// Setting up glopal scope methods
// recommended: just logger, metrics and config
global.quantum = {}; // Namespace
global.quantum.logger = require('./plugins/logger.js');


module.exports = app;
