const productsRoute = require('./products-routes');
const usersRoute = require('./users-routes');

module.exports = (app) => {
    app.use('/api/v1/users', usersRoute);
    app.use('/api/v1/products', productsRoute);
};
