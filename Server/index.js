import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";

import _db from "./Database/_db.js";

import { typedef } from "./Schema/Schema.js";
import { resolvers } from "./Resolvers/Resolvers.js";

const server = new ApolloServer({
    typeDefs: typedef,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: {port: 5500}
});

console.log(`Server is listening to port: `, 5500);