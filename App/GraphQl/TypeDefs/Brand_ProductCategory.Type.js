const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const { Product_Category_Type, Product_BrandType } = require("./Public.Types");

const Brand_ProductCategoryType = new GraphQLObjectType({
  name: "Brand_ProductCategoryType",
  fields: {
    _id: {type: GraphQLString},
    brand: {type: Product_BrandType},
    productCategory: {type: Product_Category_Type},
    title: {type: GraphQLString},
    count: {type: GraphQLInt}
  }
});

module.exports = {
  Brand_ProductCategoryType
}