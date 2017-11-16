//Could put this in the customers.controller.js but
//showing how you can create separate files if desired

module.exports = function (router) {
    router.post('/', function (req, res) {
        res.end(`
            <h1>Data posted to the /customers route</h1>
        `);
    });
};