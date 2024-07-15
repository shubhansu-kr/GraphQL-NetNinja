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