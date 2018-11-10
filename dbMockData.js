const db = require('./db');
const faker = require('faker');
const _ = require('lodash');

module.exports = (async () => {
  try {
    const users = [];
    const items = [];

    _.times(10, () => {
      users.push({ firstName: faker.name.firstName(), lastName: faker.name.lastName() })
      items.push({ name: faker.commerce.productName(), price: faker.commerce.price() })
    })

    await db.models.user.bulkCreate(users);
    await db.models.item.bulkCreate(items);
    await db.models.order.bulkCreate([
      { complete: false, userId: 1 },
      { complete: false, userId: 2 },
      { complete: false, userId: 3 },
    ]);


    const order1 = await db.models.order.findById(1);
    await order1.addItems(1);
    await order1.addItems(2);
    await order1.addItems(3);

    // const user1 = await  db.models.user.findOne({
    //   where: { id: 1 },
    //   attributes: ['firstName', 'lastName'],
    //   include: {
    //     model: db.models.order,
    //     attributes: ['id', 'complete'],
    //     include: {
    //       model: db.models.items,
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
    //     model: Items,
    //     attributes: ['id', 'name'],
    //   }],
    // });

    //const items = await order1.getItems();
    // const stuff = items.map(e => e.toJSON());
    // console.log('items', stuff);

    // const items = await Item.findAll({
    //   attributes: ['id', 'name'],
    //   include: [{all: true}]
    // });

    // const data = orders.map((orderDoc) => {
    //   const order = orderDoc.toJSON();
    //   order.items = order.items.map(item => item.id);
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
