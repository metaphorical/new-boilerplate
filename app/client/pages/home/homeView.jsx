const React = require('react');
const styles = require('./homeView.css');

const Header = require('../../components/shared/Header');
const ResultList = require('../../components/search/resultList');

module.exports = (view) => {
    return (
		<div>
			<Header updateResults={view.reducerFactory("searchResults")}/>
			{view.state.searchResults ? 
			<ResultList searchResults={view.state.searchResults.hits} />
			: 
			<div className={styles.notification}>
				Board game search - Enter your search
			</div>}
		</div>
    );
};