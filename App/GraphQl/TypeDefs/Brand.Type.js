const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt } = require("graphql");

const BrandType = new GraphQLObjectType({
  name: "BrandType",
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    en_title: {type: GraphQLString},
    description: {type: GraphQLString},
    tags: {type: new GraphQLList(GraphQLString)},
    show: {type: GraphQLBoolean},
    icon: {type: GraphQLString},
    count: {type: GraphQLInt},
    iconUrl: {type: GraphQLString}
  }
});

module.exports = {
  BrandType
}