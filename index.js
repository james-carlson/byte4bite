(async () => {
  try {
    require('dotenv').config();
    await require('./db')
    await require('./dbMockData');

    const twilio = require('twilio');
    const app = require('express')();
    const cors = require('cors');
    const graphqlHTTP = require('express-graphql');
    const graphQLSchema = require('./graphQLSchema')
    const { sendNotification } = require('./twilio');

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



    app.listen(process.env.PORT, function() {
      console.log(`server listening, PORT=${this.address().port}`)
    });
  } catch (error) {
    console.log(error);
  }
})()
