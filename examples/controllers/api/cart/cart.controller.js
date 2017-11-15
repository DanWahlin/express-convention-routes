module.exports = function (router) {
    router.get('/', function (req, res) {
        res.end(`
            <h1>Hello from the /api/cart route</h1>
            <br />
            <form method="post" action="/api/cart">
              <input type="submit" value="Post Cart" />
            </form>
        `);
    });

    router.post('/', function (req, res) {
        res.end(`
            <h1>Post data received on /api/cart route!</h1>
        `);
    });
};