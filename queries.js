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

module.exports = {
  itemScanned,
}
