const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    _id: {type: GraphQLString},
    firstname: {type: GraphQLString},
    lastname: {type: GraphQLString}
  }
});
const BlogCategoryType = new GraphQLObjectType({
  name: "BlogCategoryType",
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    iconUrl: {type: GraphQLString}
  }
});
const FileType = new GraphQLObjectType({
  name: "FileType",
  fields: {
    _id: {type: GraphQLString},
    files: {type: new GraphQLList(GraphQLString)}
  }
})

module.exports = {
  UserType,
  BlogCategoryType,
  FileType
}