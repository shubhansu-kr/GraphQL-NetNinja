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
        }
    }
};