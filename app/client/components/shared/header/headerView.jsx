const React = require('react');
const styles = require('./headerView.css');

module.exports = (view) => {
    return (
		<div className={styles.container}>
			<form onSubmit={view.doSearch}>
			<input type="text" placeholder="Enter your search" ref={(ref) => view.searchInput = ref} />	
			<input type="submit" value="Search" />
			</form>
		</div>
    );
};