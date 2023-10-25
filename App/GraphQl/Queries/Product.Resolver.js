const { GraphQLList, GraphQLString } = require("graphql");
const { ProductType } = require("../TypeDefs/Product.Type");
const { ProductModel } = require("../../Models/Product.Model");

const listOfProductResolver = {
  type: new GraphQLList(ProductType),
  resolve: async () =>{
    return await ProductModel.find({}).populate([
      {path: "file_Id", select: {files: 1}},
      {path: "product_category_Id", select: {title: 1}},
      {path: "brand_Id", select: {title: 1}},
      {path: "brand_productCat_Id", select: {title: 1}}
    ]);
  }
};
const listOfProductResolverById = {
  type: new GraphQLList(ProductType),
  args: {
    id: {type: GraphQLString}
  },
  resolve: async (_, args) =>{
    const { id } = args;
    const product = await ProductModel.find({_id: id}).populate([
        {path: "file_Id", select: {files: 1}},
        {path: "product_category_Id", select: {title: 1}},
        {path: "brand_Id", select: {title: 1}},
        {path: "brand_productCat_Id", select: {title: 1}}
      ]);
    return product
  }
}

module.exports = {
  listOfProductResolver,
  listOfProductResolverById
}