const db = require('./db');

const itemScanned = async (barcode) => {
  const orders = await db.models.order.findAll({
    include: {
      attributes: ['id'],
      model: db.models.item,
      where: { barcode }
    },
  })
  const orderIds = orders.map(order => order.toJSON().id);

  const users = await db.models.user.findAll({
    attributes: ['firstName', 'lastName', 'phone'],
    where: { id: orderIds }
  })

  const list = users.map(user => user.toJSON());

  return list
}

async function getItemByBarcode(barcode) {
  const item = db.models.item.findOne({
    where: { barcode }
  });

  return item
}

async function addToOrder(orderId, itemId) {
  console.log('order:', orderId, 'item', itemId)
  const order = await db.models.order.findById(orderId);
  await order.addItems(itemId);

  return 'added';
}

async function addUser(firstName, lastName, phone) {
  await db.models.user.create({ firstName, lastName, phone });
}


module.exports = {
  getItemByBarcode,
  itemScanned,
  addToOrder,
  addUser
}

