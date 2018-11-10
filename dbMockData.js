const db = require('./db');
const faker = require('faker');
const _ = require('lodash');

module.exports = (async () => {
  try {
    const users = [
      { firstName: 'Jon', lastName: 'Myrick' },
      { firstName: 'James', lastName: 'Carlson' },
      { firstName: 'Keith', lastName: 'Halterman' },
    ];
    const items = [];

    _.times(20, () => {
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

    console.log('auto-filled mock data')
  } catch (error) {
    console.log(error);
  }
})();
