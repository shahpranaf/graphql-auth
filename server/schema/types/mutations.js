const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");
const UserType = require("./user_type");
const AuthService = require("../../services/auth");

const mutations = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        signup: { 
            type: UserType,
            args: { 
              email: {
                type: new GraphQLNonNull(GraphQLString)
              },
              password: {
                type: new GraphQLNonNull(GraphQLString)
              }
            },
            resolve: ( parentValue, { email, password }, req ) => {
                return AuthService.signup({email, password, req});
            } 
        },
        login: { 
            type: UserType,
            args: { 
              email: {
                type: new GraphQLNonNull(GraphQLString)
              },
              password: {
                type: new GraphQLNonNull(GraphQLString)
              }
            },
            resolve: (parentValue, { email, password }, req) => {
                return AuthService.login({ email, password, req })
            } 
        },
        logout: {
            type: UserType,
            resolve: (parentValue, args, req) => {
                const { user } = req;
                req.logout();
                return user;
            }
        }
    }
});


module.exports = mutations;
