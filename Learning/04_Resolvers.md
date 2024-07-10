# Resolvers in GraphQL

Now, we need to write resolver function for each entrypoint we created in the graphQL schema. 

Create resolver object in the `index.js` file.
```
const resolvers = {
    Query: {
        games () {
            return _db.games;
        },
        reviews () {
            return _db.reviews;
        },
        authors () {
            return _db.authors;
        }
    }
}
```

In the resolver object, for the entry point of type `Query`, create a query object. Inside the query object, all the entry points names used to create resolver function. Once resolver function for each query with the same name. Function name and entrypoint name should strictly match.

Now we have the resolver setup, inside the resolver function we return the data requested by the client after fetching it from the database. The database returns the complete data with all the properties, but its the apollo server which filter the attributes according to the request and send only the data attribute requested by the user in the response object. This magic is handled by the apollo server we imported as a dependency. 

Final Index.js 
```
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
```

Go to `[http://localhost:5500/](http://localhost:5500/)` to see the apollo server
