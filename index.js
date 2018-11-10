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
    app.use(cors({ origin: ['https://b696510c.ngrok.io', 'http://localhost:3000']}))
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

        return res.send(item.name);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error)
      }
    });

    app.post('/add', async (req, res) => {
      try {
        const { orderId, itemId } = req.body;
        const result = await addToOrder(orderId, itemId)
        return res.send(result);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error)
      }
    })

    app.post('/add-user', async (req, res) => {
      try {
        const { firstName, lastName, phone} = req.body;
        const result = await addUser(firstName, lastName, phone)
        return res.send({userId: result.user.id, orderId: result.order.id});
      } catch (error) {
        console.log(error);
        return res.status(500).send(error)
      }
    })


    app.listen(process.env.PORT, function() {
      console.log(`server listening, PORT=${this.address().port}`)
    });
  } catch (error) {
    console.log(error);
  }
})()
