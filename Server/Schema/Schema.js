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
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }
`;

/* 

In graphql, we have 5 different data types: 
1. int 
2. float
3. string 
4. boolean 
5. ID 
 
*/

// We can add '!' mark to make a field required.
// Syntax to define a data type 
/* 

type <typeName> {
    <attribute>: <attributeDataType>
}

type Game {
    id: ID,
    title: String,
    platform: [String]
}

*/

// type Query is used to define the entry point for frontend queries.
/* 
type Query {
    reviews: [Reviews]
}
*/