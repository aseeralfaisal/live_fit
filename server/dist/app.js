import * as dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import cors from 'cors';
import resolvers from './graphql/resolvers/index';
import typeDefs from './graphql/schema';
import mongoose from 'mongoose';
const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;
async function startApolloServer() {
    const app = express();
    const httpServer = http.createServer(app);
    var server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    const connect = await mongoose.connect(mongoUri);
    if (connect) {
        console.log('Connected to DB');
    }
    else {
        console.log("Couldn't connect to DB");
    }
    await server.start();
    server.applyMiddleware({ app });
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    await new Promise((resolve) => httpServer.listen(PORT, resolve));
    console.log(`👌👌 Ready at http://localhost:${PORT}${server.graphqlPath} `);
}
startApolloServer();
//# sourceMappingURL=app.js.map