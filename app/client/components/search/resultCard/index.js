"use strict";

const React = require('react');
const resultCard = require('./resultCard.jsx');


var ResultCard = React.createClass({
	getInitialState() {
		return {};
    },
    render() {
        return resultCard(this);
    }
});

module.exports = ResultCard;