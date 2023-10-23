const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const {listOfBlogResolver, listOfBlogResolverById, listOfBlogResolverByCategory} = require("./Queries/Blog.Resolver");
const { listOfBlogCategoryResolver, listOfBlogCategoryResolverById, listOfBlogCategoryResolverShow } = require("./Queries/Blog_Category.Resolver");
const { listOfMenuResolver, listOfMenuResolverById } = require("./Queries/Menu.Resolver");
const { listOfProductCategoryResolver } = require("./Queries/Product_Category.Resolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: listOfBlogResolver,
    blogById: listOfBlogResolverById,
    blogByCategory: listOfBlogResolverByCategory,
    blogCategoreis: listOfBlogCategoryResolver,
    blogCategoreisById: listOfBlogCategoryResolverById,
    blogCategoreisShowInArchive: listOfBlogCategoryResolverShow,
    menus: listOfMenuResolver,
    menuById: listOfMenuResolverById,
    productCategories: listOfProductCategoryResolver
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