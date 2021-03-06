const express = require('express');
const path = require('path');

// import ApolloServer
const { ApolloServer } = require ('apollo-server-express');

// import typeDefs and resolvers from the schema index file 
const { typeDefs, resolvers } = require('./schemas');

const { authMiddleware } = require ('./utils/auth');

const db = require('./config/connection');


//const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

//// create a new Apollo server and pass in our schema data 
const server = new ApolloServer({
  typeDefs,
  resolvers,
   //This ensures that every request performs an authentication check, and the updated request object will be passed to the resolvers as the context
  constext: authMiddleware
});

// integrate our Apollo server with the Express application as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
