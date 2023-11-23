const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLBoolean, GraphQLScalarType } = require("graphql");
const { Product_Category_Type, Product_BrandType, productType_Type, FileType } = require("./Public.Types");
const { Brand_ProductCategoryType } = require("./Brand_ProductCategory.Type");

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    en_title: {type: GraphQLString},
    product_category_Id: {type: Product_Category_Type},
    brand_Id: {type: Product_BrandType},
    brand_productCat_Id: {type: Brand_ProductCategoryType},
    main_price: {type: GraphQLInt},
    price: {type: GraphQLInt},
    discount: {type: GraphQLInt},
    preparation_time: {type: GraphQLInt},
    short_text: {type: GraphQLString},
    text: {type: GraphQLString},
    tags: {type: new GraphQLList(GraphQLString)},
    returnable: {type: GraphQLBoolean},
    publication_date: {type: GraphQLString},
    publication_status: {type: GraphQLBoolean},
    stock: {type: GraphQLInt},
    createAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
    stock_limite: {type: GraphQLString}
    // file_Id: {type: FileType},
    // producer: {type: GraphQLString},
    // status: {type: GraphQLString},
    // stock: {type: GraphQLInt},
    // active: {type: GraphQLBoolean},
    // send_date: {type: GraphQLString},
    // returned: {type: GraphQLBoolean},
    // fileUrl: {type: new GraphQLList(GraphQLString)},
    // refrenceImage: {type: GraphQLString},
  }
});

module.exports = {
  ProductType
}