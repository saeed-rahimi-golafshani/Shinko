const { GraphQLList, GraphQLString } = require("graphql");
const { Blog_CategoryType } = require("../TypeDefs/Blog_Category.Type");
const { BlogCategoryModel } = require("../../Models/Blog_Category.Model");

const listOfBlogCategoryResolver = {
  type: new GraphQLList(Blog_CategoryType),
  resolve: async (_, args, context) => {
    return blogCategories = await BlogCategoryModel.find({parent_Category: undefined})
  }
};
const listOfBlogCategoryResolverById = {
  type: new GraphQLList(Blog_CategoryType),
  args: {
    id: {type: GraphQLString}
  },
  resolve: async (_, args, context) => {
    const { id } = args;
    return blogCategory = await BlogCategoryModel.find({_id: id});
  }
};
const listOfBlogCategoryResolverShow = {
  type: new GraphQLList(Blog_CategoryType),
  resolve: async(_, args, context) => {
    return blogCategories = await BlogCategoryModel.find({showInArchive: true});
  }
};

module.exports = {
  listOfBlogCategoryResolver,
  listOfBlogCategoryResolverById,
  listOfBlogCategoryResolverShow
}