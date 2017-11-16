module.exports = function (router) {
    router.get('/', function (req, res) {
        res.end(`
            <h1>Hello from the /customers route</h1>
            <br />
            <form method="post" action="/customers">
              <input type="submit" value="Post Customer" />
            </form>
        `);
    });
};