module.exports = function (router) {
    router.get('/', function (req, res) {
        res.end(`
            <h1>Hello from the / route</h1>
            <br />
            <h3>Other Routes:</h3>
            <br />
            <a href="/customers">/customers</a>
            <br />
            <a href="/api/cart">/api/cart</a>
        `);
    });
};