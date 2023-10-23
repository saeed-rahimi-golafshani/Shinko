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
const AnyType = new GraphQLScalarType({
  name: "AnyType",
  parseValue: toObject,
  serialize: toObject,
  parseLiteral: parseLiteral
});
const ProductCategoryType = new GraphQLObjectType({
  name: "ProductCategoryType",
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    iconUrl: {type: GraphQLString},
    count: {type: GraphQLInt}
  }
});

module.exports = {
  UserType,
  BlogCategoryType,
  FileType,
  AnyType,
  ProductCategoryType
}