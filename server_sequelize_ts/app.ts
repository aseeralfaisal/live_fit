import * as dotenv from 'dotenv'
dotenv.config()
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import cors from 'cors'
import resolvers from './graphql/resolvers/index'
import typeDefs from './graphql/schema'

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