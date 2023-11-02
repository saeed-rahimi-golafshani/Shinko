const { GraphQLObjectType, GraphQLString } = require("graphql");
const { Product_Category_Type } = require("./Public.Types");

const VariationType = new GraphQLObjectType({
  name: "VariationType",
  fields: {
    _id: {type: GraphQLString},
    product_category_Id: {type: Product_Category_Type},
    name: {type: GraphQLString}
  }
});

module.exports = {
  VariationType
}