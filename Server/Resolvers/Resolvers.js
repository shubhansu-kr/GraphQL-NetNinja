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