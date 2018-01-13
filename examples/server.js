var express = require('express');
    path = require('path'),
    router = require('../index.js'),
    app = express(),
    port = 3000;

// Change working directory since we're working in the "examples" subfolder
process.chdir('./examples');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Automatically register routes/controllers using express-convention-routes
router.load(app, {
  // Defaults to "./controllers" but showing for example
  routesDirectory: './controllers', 

  // Define root directory for server ("examples" folder is added in this case)
  rootDirectory: __dirname,
  
  // Do you want the created routes to be shown in the console?
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

