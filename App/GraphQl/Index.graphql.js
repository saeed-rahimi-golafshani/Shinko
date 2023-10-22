const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { 
  listOfBlogResolver, 
  listOfBlogResolverById, 
  listOfBlogResolverByCategory} = require("./Queries/Blog.Resolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: listOfBlogResolver,
    blogById: listOfBlogResolverById,
    blogByCategory: listOfBlogResolverByCategory
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