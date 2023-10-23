const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLBoolean } = require("graphql");
const { AnyType } = require("./Public.Types");

const ProductCategoryType = new GraphQLObjectType({
  name: "ProductCategoryType",
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    en_title: {type: GraphQLString},
    text: {type: GraphQLString},
    short_text: {type: GraphQLString},
    icon: {type: GraphQLString},
    tags: {type: new GraphQLList(GraphQLString)},
    count: {type: GraphQLInt},
    showInArchive: {type: GraphQLBoolean},
    priority: {type: GraphQLString},
    children: {type: new GraphQLList(AnyType)},
    iconUrl: {type: GraphQLString},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
  }
})

module.exports = {
  ProductCategoryType
}