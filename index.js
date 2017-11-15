'use strict';

var fs = require('fs'),
    path = require('path'),
    express = require('express');

var router = function () {

    var startFolder = null,
        defaultSettings = {
            routesDirectory: './controllers',
            rootDirectory: './',
            logRoutes: false,
        },
        settings = null,
        expressApp = null,

        //Called once during initial server startup
        load = function (app, routerSettings) {
            expressApp = app;
            settings = Object.assign(defaultSettings, routerSettings);
            parseRoutes(settings.routesDirectory);
            return;
        },

        parseRoutes = function (folderName) {
            if (!startFolder) startFolder = path.basename(folderName);

            fs.readdirSync(folderName).forEach(function (file) {
                var fullName = path.join(folderName, file);
                var stat = fs.lstatSync(fullName);

                if (stat.isDirectory()) {
                    //Recursively walk-through folders
                    parseRoutes(fullName);
                }
                else if (file.toLowerCase().indexOf('.js')) {
                    createRoute(fullName);
                }
            });

        },

        createRoute = function (fullName) {
            //Grab path to JavaScript file and use it to construct the route
            var dirs = path.dirname(fullName).split(path.sep);

            if (dirs[0].toLowerCase() === startFolder.toLowerCase()) {
                dirs.splice(0, 1);
            }

            var router = express.Router();
            //Generate the route
            var baseRoute = '/' + dirs.join('/');
            if (settings.logRoutes) {
                console.log('Created route: ' + baseRoute + ' for ' + fullName);
            }

            //Load the JavaScript file ("controller") and pass the router to it
            require(settings.rootDirectory + fullName)(router);
            //Associate the route with the router
            expressApp.use(baseRoute, router);
        };

    return {
        load: load
    };

}();

module.exports = router;






