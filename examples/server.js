var express = require('express');
    path = require('path'),
    router = require('../index.js'),
    app = express(),
    port = 3000;

//Change working directory since we're working in the "examples" subfolder
process.chdir('./examples');

//Automatically register routes/controllers using express-convention-router
router.load(app, {
  //Defaults to "./controllers" but showing for example
  routesDirectory: './controllers', 

  //Defined since "controllers" isn't at the root of the project
  //and is in "examples" for this particular example
  rootDirectory: './examples/',
  
  //Do you want the created routes to be shown in the console?
  logRoutes: true
});

app.use(function(req, res, next) {
  res.end("Didn't match a route!");
  next();
});

app.listen(port, (err) => {
  var env = process.env.NODE_ENV || '';
  console.log('%s Listening on http://localhost:%d', env, port);
});

