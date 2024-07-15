# Mutation in GraphQL

Query only allows us to fetch data. In order to update, insert or delete the data, we need to use mutations in GraphQL

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


