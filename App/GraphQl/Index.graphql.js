const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { 
  listOfBlogResolver, 
  listOfBlogResolverById } = require("./Queries/Blog.Resolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: listOfBlogResolver,
    blogById: listOfBlogResolverById
  }
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    
  }
});

const graphqlSchema = new GraphQLSchema({
  query: RootQuery,
  // mutation: RootMutation
});

module.exports ={ 
  graphqlSchema
}