const Sequelize = require('sequelize');
module.exports = (async () => {
  try {
    // create db instance
    const db = new Sequelize('testdb', 'jonmyrick', 'none', {
      dialect: 'postgres',
      operatorsAliases: false,
      logging: false,
    });
    console.log('db connected');
    await db.authenticate();


    const User = db.define('user', {
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
    })

    const Order = db.define('order', {
      complete: Sequelize.BOOLEAN
    })

    const Product = db.define('product', {
      name: Sequelize.STRING,
      price: Sequelize.STRING,
    })

    User.hasMany(Order);
    Order.belongsTo(User)
    Order.belongsToMany(Product, { through: 'ordersProducts' });


    await db.sync({force: true}) // force: true will drop the table if it already exists
    console.log('tables reset');

    module.exports = db;

  } catch (error) {
    console.log(error);
  }
})();
