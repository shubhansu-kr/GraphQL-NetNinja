# Creating GraphQL Server

Use apollo server to create a backend server for graphQL. [Read more about apollo server here.](https://www.apollographql.com/docs/apollo-server/)

Follow the getting started documentation to setup the server. [Getting Started](https://www.apollographql.com/docs/apollo-server/getting-started).

```
import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";

// Server Setup : ApolloServer taks an object as an argument and that object has two properties: typedef (description of our data types and their relation with other datatypes) and resolver (function which resolve how we respond to different queries).
const server = new ApolloServer({

})

const { url } = await startStandaloneServer(server, {
    listen: {port: 5500}
});

console.log(`Server is listening to port: `, 4000);
```