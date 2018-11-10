const db = require('./db');
const faker = require('faker');
const _ = require('lodash');

module.exports = (async () => {
  try {
    const users = [
      { firstName: 'Jon', lastName: 'Myrick', phone: '9169701983' },
      { firstName: 'James', lastName: 'Carlson', phone: '8018679648' },
      { firstName: 'Keith', lastName: 'Halterman', phone: '6787785669' },
    ];
    const items = [];

    _.times(20, () => {
      items.push({ name: faker.commerce.productName(), price: faker.commerce.price() })
    })

    items.push({ name: faker.commerce.productName(), price: faker.commerce.price(), barcode: '888903201072'})

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
    await order1.addItems(21);

    console.log('auto-filled mock data')
  } catch (error) {
    console.log(error);
  }
})();
