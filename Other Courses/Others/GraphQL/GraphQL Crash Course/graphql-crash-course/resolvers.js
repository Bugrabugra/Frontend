// db
import db from "./_db.js";


export const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(parent, args) {
      const { id } = args;
      return db.games.find((game) => game.id === id);
    },
    reviews() {
      return db.reviews;
    },
    review(parent, args) {
      const { id } = args;
      return db.reviews.find((review) => review.id === id);
    },
    authors() {
      return db.authors;
    },
    author(parent, args) {
      const { id } = args;
      return db.authors.find((author) => author.id === id);
    }
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    }
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    }
  },
  Review: {
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    }
  },
  Mutation: {
    deleteGame(parent, args) {
      const { id } = args;
      db.games = db.games.filter((game) => game.id !== id);

      return db.games;
    },
    addGame(parent, args) {
      const game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString()
      };
      db.games.push(game);

      return game;
    },
    updateGame(parent, args) {
      const { id, edits } = args;
      db.games = db.games.map((game) => {
        if (game.id === id) {
          return { ...game, ...edits };
        }
        return game;
      });

      return db.games.find((game) => game.id === id);
    }
  }
};
