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
  resolve: async (_, args) => {
    const { id } = args;
    return blog = await BlogModel.findOne({_id: id});
  }
}

module.exports = {
  listOfBlogResolver,
  listOfBlogResolverById
}