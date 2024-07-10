# Related Data in Graph QL 

As of now, we haven't created any relations between the data tables. But if you look closely in the database table, the reviews table has gameid and reviewid attribute attached to it, which links all the three tables. Now to access it through a client we need to add more entry points and write resolvers for it.

Now to address the nested queries we do not create a new entry point inside query but rather create a entrypoint type game or author, so that when graphql needs to expand on game or author field it chains the entrypoint and calls it's type.

The graphQL queries the game resolver and when it resolves the data, and it needs to expand on game data, it call the game resolver which has parent object as argument which gives the id of the game we need to query.

Updated `Resolver.js` file : 
```
import _db from "../Database/_db.js";

export const resolvers = {
    Query: {
        reviews () {
            return _db.reviews;
        },
        review (_, args) {
            return _db.reviews.find((review) => review.id === args.id);
        },
        games () {
            return _db.games;
        },
        game (_, args) {
            return _db.games.find((game) => game.id === args.id);
        },
        authors () {
            return _db.authors;
        },
        author (_, args) {
            return _db.authors.find((author) => author.id === args.id);
        },
    },
    Game: {
        reviews(parent) {
            return _db.reviews.filter((r) => r.game_id === parent.id);
        }
    },
    Author: {
        reviews(parent) {
            return _db.reviews.filter((r) => r.author_id === parent.id);
        }
    },
    Review: {
        game(parent) {
            return _db.games.find((g) => g.id === parent.game_id);
        },
        author(parent) {
            return _db.authors.find((a) => a.id === parent.author_id);
        }
    }
};
```

Update Schema.js
```
export const typedef = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }

    type Review {
        id: ID!
        rating: Float!
        content: String!
        game: Game!
        author: Author!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
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
