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
    }
};