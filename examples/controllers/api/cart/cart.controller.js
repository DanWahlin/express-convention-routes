// Can use a class:

class CartController {

    constructor(router) {
        router.get('/', this.get.bind(this));
        router.post('/', this.post.bind(this));
    }

    get(req, res) {
        res.end(`
            <h1>Hello from the /api/cart route</h1>
            <br />
            <form method="post" action="/api/cart">
              <input type="submit" value="Post Cart" />
            </form>
        `);
    }

    post(req, res) {
        res.json(
            { message: 'Post data received on /api/cart route!' }
        );
    }
}

module.exports = CartController;

// Or use a function:

// module.exports = function (router) {
//     router.get('/', function (req, res) {
//         res.end(`
//             <h1>Hello from the /api/cart route</h1>
//             <br />
//             <form method="post" action="/api/cart">
//               <input type="submit" value="Post Cart" />
//             </form>
//         `);
//     });

//     router.post('/', function (req, res) {
//         res.json(
//             { message: 'Post data received on /api/cart route!' }
//         );
//     });
// };