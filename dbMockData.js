const db = require('./db');
const faker = require('faker');
const _ = require('lodash');

module.exports = (async () => {
  try {
    const users = [];
    const products = [];

    _.times(10, () => {
      users.push({ firstName: faker.name.firstName(), lastName: faker.name.lastName() })
      products.push({ name: faker.commerce.productName(), price: faker.commerce.price() })
    })

    await db.models.user.bulkCreate(users);
    await db.models.product.bulkCreate(products);
    await db.models.order.bulkCreate([
      { complete: false, userId: 1 },
      { complete: false, userId: 2 },
      { complete: false, userId: 3 },
    ]);


    const order1 = await db.models.order.findById(1);
    await order1.addProducts(1);
    await order1.addProducts(2);
    await order1.addProducts(3);

    // const user1 = await  db.models.user.findOne({
    //   where: { id: 1 },
    //   attributes: ['firstName', 'lastName'],
    //   include: {
    //     model: db.models.order,
    //     attributes: ['id', 'complete'],
    //     include: {
    //       model: db.models.product,
    //       attributes: ['id', 'name', 'price'],
    //     }
    //   }
    // });

    console.log('auto filled mock data')

    // const orders = await user1.getOrders();
    // console.log(orders)




    // const orders = await Order.findOne({
    //   where: { id: 1 },
    //   attributes: ['id', 'complete'],
    //   include: [{
    //     model: Product,
    //     attributes: ['id', 'name'],
    //   }],
    // });

    //const products = await order1.getProducts();
    // const stuff = products.map(e => e.toJSON());
    // console.log('products', stuff);

    // const products = await Product.findAll({
    //   attributes: ['id', 'name'],
    //   include: [{all: true}]
    // });

    // const data = orders.map((orderDoc) => {
    //   const order = orderDoc.toJSON();
    //   order.products = order.products.map(product => product.id);
    //   return order;
    // })

    // console.log('orders', JSON.stringify(orders, null, 2));



    //  const orders = await Order.find({
    //   where: { userId: 1 },
    //   attributes: ['id', 'userId', 'complete'],
    //   include: [{all: true}],
    //   raw: true,
    // });
  } catch (error) {
    console.log(error);
  }
})();
