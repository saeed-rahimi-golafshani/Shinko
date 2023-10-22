const { GraphQLList, GraphQLString } = require("graphql");
const { BlogType } = require("../TypeDefs/Blog.Type");
const { BlogModel } = require("../../Models/Blog.Model");

const listOfBlogResolver = {
  type: new GraphQLList(BlogType),
  resolve: async (_, args, context) => {
    const blogs = await BlogModel.find({show: true}).populate([
      {path: "author"},
      {path: "blog_category_Id"},
      {path: "file_Id"}
    ]);
    return blogs
  }
};
const listOfBlogResolverById = {
  type: new GraphQLList(BlogType),
  args: {
    id: {type: GraphQLString}
  },
  resolve: async (_, args, context) => {
    const { id } = args;
    const blog = await BlogModel.find({_id: id}).populate([
      {path: "author"},
      {path: "blog_category_Id"},
      {path: "file_Id"},
    ]);
    return blog
  }
};
const listOfBlogResolverByCategory ={
  type: new GraphQLList(BlogType),
  args: {
    bCategoryId: {type: GraphQLString}
  },
  resolve: async (_, args, context) => {
    const { bCategoryId } = args;
    return blogs = await BlogModel.find({blog_category_Id: bCategoryId}).populate([
      {path: "author"},
      {path: "blog_category_Id"},
      {path: "file_Id"},
    ]);
  }
}

module.exports = {
  listOfBlogResolver,
  listOfBlogResolverById,
  listOfBlogResolverByCategory
}