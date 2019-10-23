const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
/*
    The path to schema.graphql included in the typeDefs key in the GrpahQlServer at the bottom
    defines the GraphQL Schema.
    Defines a Query type with one field called info
    The Field has the type String and the exclamation mark means it can never be null

    Extending the schema definition:
    1: Extend the GraphQL schema definition with a new root field (and new data types, if needed)
    2: Implement corresponding resolver functions for the added fields
    One convenient thing about the constructor of the GraphQLServer is that typeDefs can be provided either
    directly as a string (as you previously did) or by referencing a file that contains
    your schema definition (this is what you’re doing now).
*/

/*
    The actual implementation of the GraphQL schema
    The structure is exactly the same as the definition inside typeDefs: Query.info

    Notice that a resolver always has to be named after the corresponding field from the schema definition
    Addedthree more resolvers for the fields on the Link type from the schema definition
*/
const resolvers = {
  Query,
  Mutation,
  User,
  Link,
};

/*
    Schema and resolvers are bundled and passed to the GraphQLServer imported from graphQL-yoga
    This tells the server what api operations are accepted and how they should be resolved.
    The Schema is now in another file - put in the relative path here
*/
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    };
  },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
