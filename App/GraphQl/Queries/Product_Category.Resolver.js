const { GraphQLList, GraphQLString } = require("graphql");
const { ProductCategoryType } = require("../TypeDefs/Product_Category.Type");
const { ProductCategoryModel } = require("../../Models/Product_Category.Model");

const listOfProductCategoryResolver = {
  type: new GraphQLList(ProductCategoryType),
  resolve: async(_, args, context) => {
    return productCategories = await ProductCategoryModel.find({parent_Category: undefined})
  }
};
const listOfProductCategoryResolverById = {
  type: new GraphQLList(ProductCategoryType),
  args: {
    id: {type: GraphQLString}
  },
  resolve: async(_, args, context) => {
    const { id } = args;
    return productCategory = await ProductCategoryModel.find({_id: id})
  }
};
const listOfProductCategoryResolverShow = {
  type: new GraphQLList(ProductCategoryType),
  resolve: async(_, args, context) => {
    return productCategories = await ProductCategoryModel.find({parent_Category: undefined, showInArchive: true})
  }
};
const listOfProductCategoryResolverByParentId = {
  type: new GraphQLList(ProductCategoryType),
  args: {
    parentId: {type: GraphQLString}
  },
  resolve: async(_, args, context) => {
    const { parentId } = args;
    return await ProductCategoryModel.find({parent_Category: parentId});
  }
}


module.exports = {
  listOfProductCategoryResolver,
  listOfProductCategoryResolverById,
  listOfProductCategoryResolverShow,
  listOfProductCategoryResolverByParentId
}