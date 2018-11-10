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
    const { itemScanned, addToOrder } = require('./queries');


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
        if (!barcode) throw 'barcode was not defined';

        const list = await itemScanned(barcode);

        console.log(JSON.stringify(list, null, 2))
        await Promise.all(list.map(async user => {
          await sendNotification('1', user.phone);
        }));

        res.send('succuess');
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


    app.listen(process.env.PORT, function() {
      console.log(`server listening, PORT=${this.address().port}`)
    });
  } catch (error) {
    console.log(error);
  }
})()
