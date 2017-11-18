//Could put this in the customers.controller.js but
//showing how you can create separate files if desired

module.exports = function (router) {
    var view = __dirname + '/customers';

    router.post('/', function (req, res) {
        res.render(view, { posted: true })
    });
};