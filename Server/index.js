import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";

import { typedef } from "./Schema/Schema";

// Server Setup : ApolloServer taks an object as an argument and that object has two properties: typedef (description of our data types and their relation with other datatypes) and resolver (function which resolve how we respond to different queries).
const server = new ApolloServer({
    typedef
})

const { url } = await startStandaloneServer(server, {
    listen: {port: 5500}
});

console.log(`Server is listening to port: `, 4000);