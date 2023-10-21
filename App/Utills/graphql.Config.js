const { graphqlSchema } = require("../GraphQl/Index.graphql");

function graphqlConfig(req, res){
  return {
    schema: graphqlSchema,
    graphiql: true,
    context: {req, res}
  }
}

module.exports = {
  graphqlConfig
}