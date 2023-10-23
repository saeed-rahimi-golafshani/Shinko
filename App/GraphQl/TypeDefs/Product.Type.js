const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLBoolean } = require("graphql");
const { ProductCategoryType, Product_BrandType, productType_Type, FileType } = require("./Public.Types");

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    en_title: {type: GraphQLString},
    text: {type: GraphQLString},
    short_text: {type: GraphQLString},
    tags: {type: new GraphQLList(GraphQLString)},
    product_category: {type: ProductCategoryType},
    brand: {type: Product_BrandType},
    product_Type: {type: productType_Type},
    files: {type: FileType},
    producer: {type: GraphQLString},
    status: {type: GraphQLString},
    Stock: {type: GraphQLInt},
    active: {type: GraphQLBoolean},
    main_price: {type: GraphQLInt},
    discount: {type: GraphQLInt},
    price: {type: GraphQLInt},
    sendDate: {type: GraphQLString},
    returned: {type: GraphQLBoolean},
    fileUrl: {type: GraphQLString},
    imagerefrence: {type: GraphQLString}
  }
});

module.exports = {
  ProductType
}