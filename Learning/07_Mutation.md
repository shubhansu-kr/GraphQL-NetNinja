# Mutation in GraphQL

Query only allows us to fetch data. In order to update, insert or delete the data, we need to use mutations in GraphQL


## Delete Mutation
Update `Schema.js`, Add the following: 
```
    type Mutation{
        deleteGame(id: ID!): [Game]
    }
```
deleteGame expects an id and returns the list of games after deleting the game with matching id.

Now, we would have to write the resolver for the same as well.

Update `Resolver.js`, Add the following: 
```
Mutation: {
    deleteGame(_, args) {
        _db.games = db.games.filter((g) => g.id != args.id)
        return _db.games;
    }
}
```

Run the following Query from frontend to delete the game 
```
mutation DeleteMutation($id: ID!) {
    deleteGame(id: $id){
        id, 
        title,
        platform
    }
}
```

This query deletes the game with given id and then fetches only id, title and platform for the games which are left.


## Add Mutation

Now, To make addition to the database for any table, we would need to input all the attributes of the table. We can do this by passing all the args in the function or we can create a custom input type which will have all the attributes of the table and we can pass a single args to the add function in the schema.

Update `Schema.js`, add the following:
```
input AddGameInput {
    title: String!,
    platform: [String!]!
}
```
We have added a string as title and an array of string as platform on which game is available.

Add function to the mutation list in `Schema.js`
```
type Mutation{
    deleteGame(id: ID!): [Game]
    addGame(game: AddGameInput): Game
}
```

Now again, add resolver for the function you just created in `Resolver.js`
```
addGame(_, args) {
    let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString()
    }
    _db.games.push(game);
    return game;
}
```
Destructure the args and add a random generated Id to the object and push it in the database array.

Now run the front end query to add game: 
```
mutation AddMutation($game: AddGameInput!){
    addGame(game: $game) {
        id, 
        title,
        platform
    }
}
```

InputConsole: 
```
{
    "game": "a new Game",
    "platform": ["switch", "ps5"]
}
```

## Update Mutation

To update any entry in the a table we would again create a custom input type so that we wont have to pass everything in the function as multiple args and if a user want to update only few properties of the table, they can easily pass on the custom input as they wont be made required in the schema.

Add the following code in `Schema.js`: 
```
type Mutation{
    deleteGame(id: ID!): [Game]
    addGame(game: AddGameInput): Game
    updateGame(id: ID!, edit: EditGameInput): Game
}

input EditGameInput {
    title: String, 
    platform: [String!]
}
```

Again, Write the resolver for the updated schema in `Resolver.js`
```
updateGame(_, args){
    _db.games = _db.games.map((g) => {
        if (g.id === args.id) {
            return {...g, ...args.edits}
        }
        return g;
    });
    return _db.games.find((g) => g.id === args.id);
}
```

In the frontend write the following query: 
```
mutation EditMutation($id: ID!, $edits: EditGameInput!){
    updateGame(id: $id, edits: $edits) {
        title, 
        platform
    }
}
```

Type the following in Input Console: 
```
{
    "id": "2",
    "edits": {
        "title": "a new game title Update",
        "Platform": ["switch"]
    }
}
```

### Final Status: 

1. `Schema.js`
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

        type Mutation{
            deleteGame(id: ID!): [Game]
            addGame(game: AddGameInput): Game
            updateGame(id: ID!, edits: EditGameInput): Game
        }

        input AddGameInput {
            title: String!,
            platform: [String!]!
        }

        input EditGameInput {
            title: String, 
            platform: [String!]
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
    ```

2. `Resolver.js`
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
        },
        Mutation: {
            deleteGame(_, args) {
                _db.games = db.games.filter((g) => g.id != args.id)
                return _db.games;
            },
            addGame(_, args) {
                let game = {
                    ...args.game,
                    id: Math.floor(Math.random() * 10000).toString()
                };

                _db.games.push(game);

                return game;
            },
            updateGame(_, args){
                _db.games = _db.games.map((g) => {
                    if (g.id === args.id) {
                        return {...g, ...args.edits}
                    }

                    return g;
                });

                return _db.games.find((g) => g.id === args.id);
            }
        }
    };
    ```

