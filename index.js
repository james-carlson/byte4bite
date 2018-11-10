(async () => {
  try {
    require('dotenv').config();
    await require('./db')
    await require('./dbMockData');

    const app = require('express')();
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const graphqlHTTP = require('express-graphql');
    const graphQLSchema = require('./graphQLSchema')
    const { sendNotification } = require('./twilio');
    const { itemScanned, addToOrder, getItemByBarcode, addUser } = require('./queries');


    app.use(bodyParser.json())
    app.use(cors())
    app.use('/graphql', graphqlHTTP({
      schema: graphQLSchema,
      pretty: true,
      graphiql: true
    }));

    app.post('/scan', async (req, res) => {
      try {
        const barcode = req.query.barcode;
        const location = req.query.location;
        if (!barcode) throw 'barcode was not defined';

        const list = await itemScanned(barcode);
        const item = await getItemByBarcode(barcode);
        console.log(JSON.stringify(list, null, 2))
        await Promise.all(list.map(async user => {
          await sendNotification(location, user, item);
        }));

        res.send(item.name);
      } catch (error) {
        console.log(error);
        res.status(500).send(error)
      }
    });

    app.post('/add', async (req, res) => {
      try {
        const { orderId, itemId } = req.body;
        const result = await addToOrder(orderId, itemId)
        res.send(result);
      } catch (error) {
        console.log(error);
        res.status(500).send(error)
      }
    })

    app.post('/add-user', async (req, res) => {
      try {
        const { firstName, lastName, phone} = req.body;
        const userId = await addUser(firstName, lastName, phone)
        res.send(userId);
      } catch (error) {
        console.log(error);
        res.status(500).send(error)
      }
    })


    app.listen(process.env.PORT, function() {
      console.log(`server listening, PORT=${this.address().port}`)
    });
  } catch (error) {
    console.log(error);
  }
})()
