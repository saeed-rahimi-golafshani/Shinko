const { GraphQLList } = require("graphql");
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

module.exports = {
  listOfBlogResolver
}