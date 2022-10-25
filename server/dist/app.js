"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { InMemoryLRUCache } = require('@apollo/utils.keyvaluecache');
const express = require('express');
const http = require('http');
const cors = require('cors');
const resolvers = require('./graphql/index');
const typeDefs = require('./graphql/schema');
const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        const httpServer = http.createServer(app);
        var server = new ApolloServer({
            typeDefs,
            resolvers,
            csrfPrevention: true,
            cache: "bounded",
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        });
        const connect = yield mongoose.connect(mongoUri);
        if (connect) {
            console.log('Connected to DB');
        }
        else {
            console.log("Couldn't connect to DB");
        }
        yield server.start();
        server.applyMiddleware({ app });
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(cors());
        yield new Promise((resolve) => httpServer.listen(PORT, resolve));
        console.log(`👌👌 Ready at http://localhost:${PORT}${server.graphqlPath} `);
    });
}
startApolloServer();
//# sourceMappingURL=app.js.map