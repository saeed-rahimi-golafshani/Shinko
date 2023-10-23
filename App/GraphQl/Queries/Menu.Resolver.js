const { GraphQLList, GraphQLString } = require("graphql");
const { MenuType } = require("../TypeDefs/Menu.Type");
const { MenuModel } = require("../../Models/Menu.Model");

const listOfMenuResolver = {
  type: new GraphQLList(MenuType),
  resolve: async(_, args, context) => {
    return meues = await MenuModel.find({});
  }
};
const listOfMenuResolverById = {
  type: new GraphQLList(MenuType),
  args: {
    id: {type: GraphQLString}
  },
  resolve: async(_, args, context) => {
    const { id } = args;
    return meue = await MenuModel.find({_id: id});
  }
}

module.exports = {
  listOfMenuResolver,
  listOfMenuResolverById
}