const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLScalarType, GraphQLInt } = require("graphql");
const { toObject, parseLiteral } = require("../Utils");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    _id: {type: GraphQLString},
    firstname: {type: GraphQLString},
    lastname: {type: GraphQLString}
  }
});
const BlogCategoryType = new GraphQLObjectType({
  name: "BlogCategoryType",
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    iconUrl: {type: GraphQLString}
  }
});
const FileType = new GraphQLObjectType({
  name: "FileType",
  fields: {
    _id: {type: GraphQLString},
    files: {type: new GraphQLList(GraphQLString)}
  }
});

const childrenCategory = new GraphQLObjectType({
  name: "childrenCategory",
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString}
  }
});
const Product_Category_Type = new GraphQLObjectType({
  name: "Product_CategoryType",
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    children: {type: childrenCategory}
  }
});

const Product_BrandType = new GraphQLObjectType({
  name: "Product_BrandType",
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString}
  }
});
const productType_Type = new GraphQLObjectType({
  name: "productType_Type",
  feilds: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString}
  }
});
const AnyType = new GraphQLScalarType({
  name: "AnyType",
  parseValue: toObject,
  serialize: toObject,
  parseLiteral: parseLiteral
});

module.exports = {
  UserType,
  BlogCategoryType,
  FileType,
  AnyType,
  Product_Category_Type,
  Product_BrandType,
  // productType_Type
}