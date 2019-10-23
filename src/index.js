const { GraphQLServer } = require("graphql-yoga");

// Define dummy set of links
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

let idCount = links.length;

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
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => links.filter(link => link.id === args.id)[0],
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const linkToUpdate = links.filter(link => link.id === args.id)[0];
      const linkIndex = links.findIndex(id => id === linkToUpdate.id);
      for (let key in linkToUpdate) {
        if (args[key] != undefined) linkToUpdate[key] = args[key];
      }
      links.splice(linkIndex, 1, linkToUpdate);

      return linkToUpdate;
    },
    deleteLink: (parent, args) => {
      const linkToDelete = links.filter(link => link.id === args.id)[0];
      const linkIndex = links.findIndex(id => id === linkToDelete.id);
      links.splice(linkIndex, 1);
      return linkToDelete;
    },
  },
};

/*
    Schema and resolvers are bundled and passed to the GraphQLServer imported from graphQL-yoga
    This tells the server what api operations are accepted and how they should be resolved.
    The Schema is now in another file - put in the relative path here
*/
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
