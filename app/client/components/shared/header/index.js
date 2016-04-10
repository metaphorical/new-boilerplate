"use strict";

const React = require('react');
const headerView = require('./headerView.jsx');
const searchModel = require('./../../../models').search;

var Header = React.createClass({
	getInitialState() {
		return {
			title: 'Home Page'
		};
    },
	doSearch(e) {
		e.preventDefault();
		var text = this.searchInput.value.trim();
		searchModel.fetch({
			'text': text
		}).then((results) => {
			this.props.updateResults(null);
			this.props.updateResults(results);
		}).catch((err) => {
			console.log('ERROR', err);
		})
	},

    render() {
        return headerView(this);
    }
});

module.exports = Header;