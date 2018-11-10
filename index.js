(async () => {
  try {
    require('dotenv').config();
    await require('./db')
    await require('./dbMockData');

    const app = require('express')();
    const cors = require('cors');
    const graphqlHTTP = require('express-graphql');
    const graphQLSchema = require('./graphQLSchema')

    app.use(cors())
    app.use('/graphql', graphqlHTTP({
      schema: graphQLSchema,
      pretty: true,
      graphiql: true
    }));

    app.listen(process.env.PORT, function() {
      console.log(`server listening, PORT=${this.address().port}`)
    });
  } catch (error) {
    console.log(error);
  }
})()
