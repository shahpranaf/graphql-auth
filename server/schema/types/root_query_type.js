const graphql = require('graphql');
const UserType = require('./user_type');
const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const { GraphQLObjectType } = graphql;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: { 
      type: UserType,
      resolve: (parentValue, args, req) => (req.user)
    } 
  }
});

module.exports = RootQueryType;
