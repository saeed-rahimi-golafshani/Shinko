const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { VariationType } = require("./Variation.Type");

const VariationOptionType = new GraphQLObjectType({
  name: "VariationOptionType",
  fields: {
    _id: {type: GraphQLString},
    variation_Id: {type: VariationType},
    value: {type: new GraphQLList(GraphQLString)}
  }
});

module.exports = {
  VariationOptionType
}