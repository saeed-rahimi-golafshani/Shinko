const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const {listOfBlogResolver, listOfBlogResolverById, listOfBlogResolverByCategory} = require("./Queries/Blog.Resolver");
const { listOfBlogCategoryResolver, listOfBlogCategoryResolverById, listOfBlogCategoryResolverShow } = require("./Queries/Blog_Category.Resolver");
const { listOfMenuResolver, listOfMenuResolverById } = require("./Queries/Menu.Resolver");
const { listOfProductCategoryResolver, listOfProductCategoryResolverById, listOfProductCategoryResolverShow, listOfProductCategoryResolverByParentId } = require("./Queries/Product_Category.Resolver");
const { listOfProductResolver, listOfProductResolverById } = require("./Queries/Product.Resolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    // blog 
    blogs: listOfBlogResolver,
    blogById: listOfBlogResolverById,
    blogByCategory: listOfBlogResolverByCategory,
    // blog_category
    blogCategoreis: listOfBlogCategoryResolver,
    blogCategoreisById: listOfBlogCategoryResolverById,
    blogCategoreisShowInArchive: listOfBlogCategoryResolverShow,
    // menu 
    menus: listOfMenuResolver,
    menuById: listOfMenuResolverById,
    // product_category
    productCategoriesParent: listOfProductCategoryResolver,
    productCategoryById: listOfProductCategoryResolverById,
    productCategoriesShow: listOfProductCategoryResolverShow,
    productCategoriesByParentId: listOfProductCategoryResolverByParentId,
    // product 
    products: listOfProductResolver,
    productById: listOfProductResolverById

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