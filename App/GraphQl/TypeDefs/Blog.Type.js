const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");
const { UserType, BlogCategoryType, FileType } = require("./Public.Types");

const BlogType = new GraphQLObjectType({
  name: "BlogType",
  fields: {
    _id: {type: GraphQLString},
    author: {type: UserType},
    blog_category_Id: {type: BlogCategoryType},
    file_Id: {type: FileType},
    title: {type: GraphQLString},
    en_title: {type: GraphQLString},
    short_text: {type: GraphQLString},
    text: {type: GraphQLString},
    tags: {type: new GraphQLList(GraphQLString)},
    reading_time: {type: GraphQLString},
    filesUrl: {type: new GraphQLList(GraphQLString)},
    refrenceImage: {type: GraphQLString},
    show: {type: GraphQLBoolean},
    createdAt: {type: GraphQLString}
  }
});

module.exports = {
  BlogType
}