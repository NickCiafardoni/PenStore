const penStoreRoutes = require('./pen_store_routes');
module.exports = function(app, db) {
  penStoreRoutes(app, db);
};