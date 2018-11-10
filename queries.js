const db = require('./db');

const itemScanned = async (barCode) => {
  // const result = await db.models.order.getItems(
  //   {
  //     where:
  //     {
  //       barcode: '888903201072'
  //     }
  //   }

  // )

  const result = await db.models.order.find(
    {
      where: {
        barcode: '888903201072'
      }
    })
  console.log("result", result);
}