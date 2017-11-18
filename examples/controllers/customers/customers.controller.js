module.exports = function (router) {
    var view = __dirname + '/customers';

    router.get('/', function (req, res) {
        res.render(view);
    });
};