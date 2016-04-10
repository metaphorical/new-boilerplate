module.exports = {
	formatNumber: function(num, separator, currency) {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, (separator || ",")) + (currency || ''); 
	}
}