In this project, I built a GraphQL server from scratch following this tutorial here: https://www.howtographql.com/. The stack I used was based on Node.js, graphql-yoga and Prisma.

graphql-yoga is a fast and simple GraphQL server library built on top of Express.js. It comes with several features, such as out-of-the-box support for GraphQL Playgrounds and realtime GraphQL subscriptions.

The resolvers of the GraphQL server are implemented using the Prisma client that’s responsible for database access.

1: Clone Project
2: Use Yarn to install dependencies
3: Create a config.js file in the top level folder with an exported APP_SECRET constant
4: Run node src/index.js to start server
5: Navigate to http://localhost:4000 to use playground and access the API - you will need to run the login (or if you are a first time user the signup) query to get an authorization token. Then add this to the http headers section at the bottom of the playground like so: 

```
{
  "Authorization": "YOUR__TOKEN"
}
```
This will allow you to make subsequent calls to the API. Use the schema and auto-generated documentation in the tabs on the right to see what is available.
