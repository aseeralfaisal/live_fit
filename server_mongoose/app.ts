require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const express = require('express')
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
const resolvers = require('./graphql/resolvers/index')
const typeDefs = require('./graphql/schema/index')

const mongoUri = process.env.MONGO_URI
const PORT = process.env.PORT || 4000

async function startApolloServer() {
  const app = express()
  const httpServer = http.createServer(app)
  var server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  const connect = await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  if (connect) {
    console.log('Connected to DB')
  } else {
    console.log("Couldn\'t connect to DB")
  }

  await server.start()
  server.applyMiddleware({ app })
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(cors())
  await new Promise<void>((resolve) => httpServer.listen(PORT, resolve))
  
  console.log(`👌👌 Ready at ${PORT}${server.graphqlPath} `)
}
startApolloServer()

export {}