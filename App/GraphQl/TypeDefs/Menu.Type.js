const { GraphQLObjectType, GraphQLString } = require("graphql");

const MenuType = new GraphQLObjectType({
  name: "MenuType",
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    en_title: {type: GraphQLString},
    description: {type: GraphQLString},
    target: {type: GraphQLString},
    icon: {type: GraphQLString},
    createAt: {type: GraphQLString},
    updateAt: {type: GraphQLString},
    iconUrl: {type: GraphQLString},
    link: {type: GraphQLString},
  }
});

module.exports = {
  MenuType
}