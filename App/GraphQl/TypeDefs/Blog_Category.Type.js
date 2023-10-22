const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } = require("graphql");
const { AnyType } = require("./Public.Types");

const BlogCategoryType = new GraphQLObjectType({
  name: "BlogCategoryType",
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    en_title: {type: GraphQLString},
    count: {type: GraphQLInt},
    icon: {type: GraphQLString},
    iconUrl: {type: GraphQLString},
    showInArchive: {type: GraphQLBoolean},
    priority: {type: GraphQLString},
    children: {type: new GraphQLList(AnyType)}
  }
});

module.exports = {
  BlogCategoryType
}