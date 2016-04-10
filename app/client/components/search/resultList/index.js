"use strict";

const React = require('react');
const resultList = require('./resultList.jsx');
const searchModel = require('../../../models').search;


var ResultList = React.createClass({
	getInitialState() {
		return {};
    },
	componentWillReceiveProps(newProps) {
		console.log('new props', newProps)	
	},
    render() {
        return resultList(this);
    }
});

module.exports = ResultList;