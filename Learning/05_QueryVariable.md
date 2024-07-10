# Query Variables in GraphQL

As of now we had only 3 entry point for the client 
1. Get all review, 
2. Get all games, 
3. Get all authors. 

What if we want to filter down on these data. Lets say we want reviews which have rating higher that 8 or something. To achieve this we have to add more entry points to the service. 

Update the `schema.js` file
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
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }
`;
```

Now that we have added more entrypoints we would have to write corresponding resolver functions for each of the entry point. 

Update the resolver.js file 

```
import _db from "../Database/_db.js";

export const resolvers = {
    Query: {
        reviews () {
            return _db.reviews;
        },
        games () {
            return _db.games;
        },
        authors () {
            return _db.authors;
        },
        review (_, args) {
            return _db.reviews.find((review) => review.id === args.id);
        },
        game (_, args) {
            return _db.games.find((game) => game.id === args.id);
        },
        author (_, args) {
            return _db.authors.find((author) => author.id === args.id);
        },
    }
};
```

