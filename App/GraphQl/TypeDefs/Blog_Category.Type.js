const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } = require("graphql");
const { AnyType } = require("./Public.Types");

const Blog_CategoryType = new GraphQLObjectType({
  name: "Blog_CategoryType",
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
  Blog_CategoryType
}