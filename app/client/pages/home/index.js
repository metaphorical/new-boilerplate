"use strict";

const React = require('react');
const homeView = require('./homeView.jsx');
const Immutable = require('immutable');


var HomePage = React.createClass({
	getInitialState() {
		return {
			searchResults: null
		};
    },
	reducerFactory(stateKey) {
		
		var that = this;
		return function(entry) {
		    var current = Immutable.fromJS(that.state[stateKey] || {});
            var extended = current.merge(entry);
            if (!current.equals(extended)) {
				var stateAddition = {};
				stateAddition[stateKey] = extended.toJSON()
                that.setState(stateAddition);
            }
		};	
	},

    render() {
        return homeView(this);
    }
});

module.exports = React.createFactory(HomePage);