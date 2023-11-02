const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLBoolean, GraphQLScalarType } = require("graphql");
const { Product_Category_Type, Product_BrandType, productType_Type, FileType } = require("./Public.Types");
const { Brand_ProductCategoryType } = require("./Brand_ProductCategory.Type");

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    en_title: {type: GraphQLString},
    text: {type: GraphQLString},
    short_text: {type: GraphQLString},
    tags: {type: new GraphQLList(GraphQLString)},
    product_category_Id: {type: Product_Category_Type},
    brand_Id: {type: Product_BrandType},
    brand_productCat_Id: {type: Brand_ProductCategoryType},
    // Product_Type_Id: {type: productType_Type},
    file_Id: {type: FileType},
    producer: {type: GraphQLString},
    status: {type: GraphQLString},
    stock: {type: GraphQLInt},
    active: {type: GraphQLBoolean},
    main_price: {type: GraphQLInt},
    discount: {type: GraphQLInt},
    price: {type: GraphQLInt},
    sendDate: {type: GraphQLString},
    returned: {type: GraphQLBoolean},
    fileUrl: {type: GraphQLString},
    refrenceImage: {type: GraphQLString},
    stock_limite: {type: GraphQLString},
    product_feature: {type: new GraphQLList(GraphQLString)}
  }
});

module.exports = {
  ProductType
}