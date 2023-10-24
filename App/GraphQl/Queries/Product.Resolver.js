const { GraphQLList } = require("graphql");
const { ProductType } = require("../TypeDefs/Product.Type");
const { ProductModel } = require("../../Models/Product.Model");
const { stockLimited } = require("../../Utills/Public_Function");

const listOfProductResolver = {
  type: new GraphQLList(ProductType),
  resolve: async () =>{
    const stock_limite = await ProductModel.find({});
    console.log(stockLimited(10));
    console.log(stock_limite.map(item => item.stock));
    return await ProductModel.find({}).populate([
      {path: "file_Id", select: {files: 1}},
      {path: "product_category_Id", select: {title: 1}},
      // {path: "Product_Type_Id", select: {type_name: 1}},
      {path: "brand_Id", select: {title: 1}},
      {path: "brand_productCat_Id", select: {title: 1}}
    ]);
  }
}

module.exports = {
  listOfProductResolver
}