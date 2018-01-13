'use strict';

var fs = require('fs'),
    path = require('path'),
    express = require('express');

var router = function () {

    var defaultSettings = {
            routesDirectory: './controllers',
            rootDirectory: '',
            logRoutes: false
        },
        settings = null,
        expressApp = null,

        //Called only once during initial server startup
        load = function (app, routerSettings) {
            settings = Object.assign(defaultSettings, routerSettings);
            if (!settings.rootDirectory) {
                throw new Error('rootDirectory of your server must be provided (__dirname can normally be used)');
            }
            expressApp = app;
            parseDirectories(settings.routesDirectory);
            return;
        },

        parseDirectories = function (folderName) {
            fs.readdirSync(folderName).forEach(function (file) {
                var fullName = path.join(folderName, file);
                var stat = fs.lstatSync(fullName);

                if (stat.isDirectory()) {
                    //Recursively walk-through folders
                    parseDirectories(fullName);
                }
                else if (path.extname(file) === '.js') {
                    //Found .js controller file so create route
                    createRoute(fullName);
                }
            });
        },

        createRoute = function (fullName) {
            //Grab path to JavaScript file and use it to construct the route
            var dirs = path.dirname(fullName).split(path.sep);

            //Remove routesDirectory name (ex: "./controllers") 
            //so it's not in the route path that's created
            if (dirs[0].toLowerCase() === 
                path.basename(settings.routesDirectory).toLowerCase()) {
                dirs.splice(0, 1);
            }

            //Generate the route
            var router = express.Router();
            var routePath = '/' + dirs.join('/');

            //Load the JavaScript "controller" file and pass the router to it
            const controller = require(path.join(settings.rootDirectory, fullName));
            
            if (isClass(controller)) {
               new controller(router);
            }
            else {
                controller(router);
            }

            //Associate the route with the router
            expressApp.use(routePath, router);

            //Log route info if appropriate
            if (settings.logRoutes) {
                console.log('Created route: ' + routePath + ' for ' + fullName);
            }
        },

        // The following is the fastest but could pose a problem if an arrow function is used.
        // Speed isn't an issue with this scenario anyway since this is only called when the server initially fires up.
        // https://stackoverflow.com/questions/29093396/how-do-you-check-the-difference-between-an-ecmascript-6-class-and-function
        // isClass = function(func) {
        //     return typeof func === 'function' && func.hasOwnProperty('prototype') && !func.hasOwnProperty('arguments');
        // };

        isClass = function(func) {
            return typeof func === 'function' 
              && /^class\s/.test(Function.prototype.toString.call(func));
        };

    return {
        load: load
    };

}();

module.exports = router;






