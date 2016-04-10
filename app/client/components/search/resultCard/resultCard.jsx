const React = require('react');
const styles = require('./resultCard.css');

module.exports = (view) => {
    return (
		<div className={styles.container}>
			<h5>{view.props.result.name}</h5>
			<img src={view.props.result.image} />
		</div>
    );
};