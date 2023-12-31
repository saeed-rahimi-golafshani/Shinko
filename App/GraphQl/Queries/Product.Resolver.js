const { GraphQLList, GraphQLString } = require("graphql");
const { ProductType } = require("../TypeDefs/Product.Type");
const { ProductModel } = require("../../Models/Product.Model");
const { VariationModel } = require("../../Models/Variation.Model");
const { VariationOptionType } = require("../TypeDefs/Variation_Option.Type");
const { VariationOptionModel } = require("../../Models/Variation_Option.Model");
const { BrandType } = require("../TypeDefs/Brand.Type");
const { BrandModel } = require("../../Models/Brand.Model");
const { ProductCategoryType } = require("../TypeDefs/Product_Category.Type");
const { ProductCategoryModel } = require("../../Models/Product_Category.Model");

const listOfProductResolver = {
  type: new GraphQLList(ProductType),
  resolve: async () =>{
    const product = await ProductModel.find({}).populate([
      {path: "product_category_Id", select: {title: 1}},
      {path: "brand_Id", select: {title: 1}},
      {path: "brand_productCat_Id", select: {title: 1}}
    ]);
    return product
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
};
const listOfVariationProduct = {
  type: new GraphQLList(VariationOptionType),
  args: {
    proId: {type: GraphQLString}
  },
  resolve: async (_, args) => {
    const { proId } = args;
    const product = await ProductModel.find({_id: proId}).populate([
      {path: "file_Id", select: {files: 1}},
      {path: "product_category_Id", select: {title: 1}},
      {path: "brand_Id", select: {title: 1}},
      {path: "brand_productCat_Id", select: {title: 1}}  
    ]);
  const category = product[0].product_category_Id._id;
  const variation = await VariationModel.find({product_category_Id: category});
  const variationId = variation.map(item => item._id)
  const varation_opt = await VariationOptionModel.find({variation_Id: variationId}).populate([
    {path: "variation_Id", select: {name: 1}} 
  ]);
  return varation_opt
  }
};
const listOfProductByBrandId = {
  type: new GraphQLList(ProductType),
  args: {
    brandId: {type: GraphQLString}
  },
  resolve: async (_, args) => {
    const { brandId } = args;
    const product = await ProductModel.find({brand_Id: brandId}).populate([
      {path: "file_Id", select: {files: 1}},
      {path: "product_category_Id", select: {title: 1}},
      {path: "brand_Id", select: {title: 1}},
      {path: "brand_productCat_Id", select: {title: 1}}  
    ]);
    return product
  }
};
const listOfProductByCatId = {
  type: new GraphQLList(ProductType),
  args: {
    catId: {type: GraphQLString}
  },
  resolve: async (_, args) => {
    const { catId } = args;
    const product = await ProductModel.find({product_category_Id: catId}).populate([
      {path: "file_Id", select: {files: 1}},
      {path: "product_category_Id", select: {title: 1}},
      {path: "brand_Id", select: {title: 1}},
      {path: "brand_productCat_Id", select: {title: 1}}  
    ]);
    return product

  }
};
const countProductBrand = {
  type: new GraphQLList(BrandType),
  args: {
    brandId: {type: GraphQLString}
  },
  resolve: async (_, args) => {
    const { brandId } = args;
    const brand = await BrandModel.find({_id: brandId});
    return brand
  }
};
const countProductCategory = {
  type: new GraphQLList(ProductCategoryType),
  args: {
    catId: {type: GraphQLString}
  },
  resolve: async (_, args) => {
    const { catId } = args;
    const category = await ProductCategoryModel.find({_id: catId});
    return category
  }
}

module.exports = {
  listOfProductResolver,
  listOfProductResolverById,
  listOfVariationProduct,
  listOfProductByBrandId,
  listOfProductByCatId,
  countProductBrand,
  countProductCategory
}