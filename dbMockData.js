const db = require('./db');
const faker = require('faker');
const _ = require('lodash');

module.exports = (async () => {
  try {
    // Seeded database w/ test data
    const users = [
      { firstName: 'Jon', lastName: 'Myrick', phone: '9169701983' },
      { firstName: 'James', lastName: 'Carlson', phone: '8018679648' },
      { firstName: 'Keith', lastName: 'Halterman', phone: '6787785669' },
    ];

    const items = [
      { name: 'Kerns Peach Nectar', price: '5.00', barcode: '888903201072'},
      { name: 'Red Bull', price: '10.0', barcode: '611269991000'},
      { name: 'Langers Ruby Red', price: '25.00', barcode: '041755000532'},
      { name: 'Trail mix', price: '100.00', barcode: '09661936314'},
    ];


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

    const order2 = await db.models.order.findById(2);
    await order2.addItems(1);

    console.log('auto filled mock data')

  } catch (error) {
    console.log(error);
  }
})();
