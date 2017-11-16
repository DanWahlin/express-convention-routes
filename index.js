'use strict';

var fs = require('fs'),
    path = require('path'),
    express = require('express');

var router = function () {

    var defaultSettings = {
            routesDirectory: './controllers',
            rootDirectory: './',
            logRoutes: false,
        },
        settings = null,
        expressApp = null,

        //Called only once during initial server startup
        load = function (app, routerSettings) {
            expressApp = app;
            settings = Object.assign(defaultSettings, routerSettings);
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
                else if (file.toLowerCase().indexOf('.js')) {
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
            require(settings.rootDirectory + fullName)(router);
            //Associate the route with the router
            expressApp.use(routePath, router);

            //Log route info if appropriate
            if (settings.logRoutes) {
                console.log('Created route: ' + routePath + ' for ' + fullName);
            }
        };

    return {
        load: load
    };

}();

module.exports = router;






