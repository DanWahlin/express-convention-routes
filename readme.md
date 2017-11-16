# Express Convention-Based Router

This package provides a simple way to define convention-based routes in a Node.js/Express application that are created based on a directory structure. What's a convention-based Express route? It's a route that is dynamically generated and associated with a "controller" function without having to explicitly code the route yourself (i.e. you don't write code such as app.use('/foo', router)). `express-convention-router` creates routes automatically by parsing a convention-based folder structure such as the one below when the server first starts.

```
-controllers
    -customers
        -customers.controller.js
    -api
        -cart
            -cart.controller.js
    -index.controller.js
```

This allows application routes to be created without having to write any app.use() code to define the individual routes. Using the previous folder structure, `express-convention-router` would create the following routes (and associate them
with the appropriate "controller" functions):

```
/customers
/api/cart   
/
```

Each folder contains a "controller" file that defines the functionality to run for the given route. For example, if you want a root route you'd add a file into the root `controllers` folder (`index.controller.js` for example). If you want an `api/cart` route you'd create that folder structure under the `controllers` folder (see the folder example above) and add a "controller" file such as `cart.controller.js` into the `api/cart` folder. You can name the `controller` files anything you'd like and they can have as many HTTP actions (GET/POST/PUT/DELETE, etc.) in them as you want.

To get started perform the following steps:

1. Install the `express-convention-router` package locally (NOTE: The package hasn't been published to npm yet - coming soon!!)

    `npm install express-convention-router --save`

1. Create a `controllers` folder at the root of your Express project.

1. To create a root (/) route, add an `index.controller.js` file into the folder (you can name the file whatever you'd like). Put the following code into the file:

    ```JavaScript

    module.exports = function (router) {
        router.get('/', function (req, res) {
            res.end('Hello from root route!');
        });
    };
    ```

1. To create a `/customers` route, create a subfolder under `controllers` named `customers`.

1. Add a `customers.controller.js` file into the `customers` folder (you can name the file anything you'd like):

    ```JavaScript

    module.exports = function (router) {
        router.get('/', function (req, res) {
            res.end('Hello from the /customers route!');
        });
    };

    ```

1. Once the routing folder structure is created, add the following code into your express server code (index.js, server.js, etc.) to load the routes automatically based on the folder structure in the "controllers" folder when the Express server starts:

    ```JavaScript

    var router = require('express-convention-router');

    ...
    //Defaults to using the "controllers" folder to look for routes
    //that should be created. See below for overriding settings.
    router.load(app);

    ```

    The `app` object represents the Express instance.

    If you want to define the folder where your routes are, log created routes to the console, and even change the root folder where the routes folder lives you can do the following:

    ```JavaScript

    router.load(app, {
        //Defaults to "./controllers" but showing for example
        routesDirectory: './controllers', 

        //Defined if routesDirectory isn't at the root of the project
        //"examples" is the root directory for this particular example
        //Can normally leave this out if your routesDirectory is off 
        //the root of the project
        rootDirectory: './examples/',

        //Do you want the created routes to be shown in the console?
        logRoutes: true 
    });

    ```


1. Try out the included sample app by running the following commands:
* `npm install`
* `npm start`

Note: I originally got the idea from ASP.NET MVC (as well as other MVC frameworks)and KrakenJS (http://krakenjs.com). These frameworks automate the process of creating routes so I wanted to do something similar with `express-convention-router`.
