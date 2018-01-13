class IndexController {

    constructor(router) {
        router.get('/', this.get.bind(this));
    }

    get(req, res) {
        res.render(__dirname + '/index');
    }
}

module.exports = IndexController;
