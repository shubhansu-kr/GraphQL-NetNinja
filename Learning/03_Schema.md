# Schemas and Types in GraphQL 

Typedef are the definition of different data types we use.

Create a `schema.js` file to define graphQL schemas.

In graphql, we have 5 different data types: 

1. int 
2. float
3. string 
4. boolean 
5. ID 

> We can add '!' mark to make a field required.
Syntax to define a data type 
```
type <typeName> {
    <attribute>: <attributeDataType>
}
```

Example: 
```
type Game {
    id: ID,
    title: String,
    platform: [String]
}
```

type Query is used to define the entry point for frontend queries.
``` 
type Query {
    reviews: [Reviews]
    games: [Game]
    authors: [Author]
}
```

Final schema.js File: 
```
export const typedef = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
    }

    type Review {
        id: ID!
        rating: Float!
        content: String!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
    }

    type Query {
        reviews: [Reviews]
        games: [Game]
        authors: [Author]
    }
`;
```

After Creating the schema, import it in the index.js file so that you can pass it to the apollo server.