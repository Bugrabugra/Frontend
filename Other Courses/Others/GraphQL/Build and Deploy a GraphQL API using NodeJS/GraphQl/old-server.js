const { buildSchema, graphql } = require("graphql");
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require("graphql/type");

// const schema = buildSchema(`
//   type Query {
//     hello(name: String!): String
//     age: Int
//     weight: Float!
//     isOver18: Boolean
//     hobbies: [String]
//
//     user: User
//   }
//
//   type User {
//     id: Int
//     name: String
//   }
// `);

const User = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString,
      resolve: (obj) => {
        const name = obj.name.trim().toUpperCase();

        if (obj.isAdmin) {
          return `${name} (Admin)`;
        }
        return name;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => {
          return "Hello world";
        }
      },
      user: {
        type: User,
        resolve: () => {
          return {
            id: 1,
            name: "Vadim",
            isAdmin: true
          };
        }
      }
    }
  })
});

// const rootValue = {
//   hello: ({ name }) => {
//     return "Hello " + name;
//   },
//   age: 25, // () => 25
//   weight: 77.7,
//   isOver18: true,
//   hobbies: () => {
//     return ["Carting", "F1"];
//   },
//   user: () => {
//     return {
//       id: 1,
//       name: "Vadim"
//     };
//   }
// };

const app = express();

app.all("/graphql", createHandler({ schema }));

app.get("/", (_req, res) => {
  res.type("html");
  res.send(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000, () => {
  console.log("api running on http://localhost:4000");
});
