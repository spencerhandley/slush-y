/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var cors = require('cors');
var globber = require('./components/globber');
var path = require('path');
module.exports = function(app) {
  app.use(cors());
  // Insert routes below
  // app.use('/api/things', require('./api/thing'));
  // app.use('/api/users', require('./api/user'));
  globber('./server/api/*').forEach(function(routePath) {
    require(path.resolve(routePath))(app);
  });

  app.use('/api/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
