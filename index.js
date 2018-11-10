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
    const { itemScanned } = require('./queries');

    app.use(bodyParser.json())
    app.use(cors())
    app.use('/graphql', graphqlHTTP({
      schema: graphQLSchema,
      pretty: true,
      graphiql: true
    }));

    app.post('/notify/:type/:phoneNumber', async (req, res) => {
      const { type, phoneNumber } = req.params
      await sendNotification(type, phoneNumber);
      res.status(200).send("worked");
    })

    app.post('/scan', async (req, res) => {
      try {
        const list = await itemScanned(req.body.barcode);
        console.log(JSON.stringify(list, null, 2))
        res.send(list);
      } catch (error) {
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
