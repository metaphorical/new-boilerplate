var homeController = {
    getHome: function (req, res) {
        res.render('layout', {Content: 'toeto'});
    }
};

module.exports = homeController;
