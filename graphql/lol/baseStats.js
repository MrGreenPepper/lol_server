var { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql');
const path = require('path');
const fs = require('fs');
const util = require('util');
const promiseReadFile = util.promisify(fs.readFile);

const ChampionType = new GraphQLObjectType({
    name: 'Champion',
    description: 'one Champion',
    fields: () => ({
        name: { type: GraphQLString },
        baseStats: { type: GraphQLList(GraphQLInt) },
        skillOrder: { type: GraphQLList(GraphQLString) },
    }),
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root champion query',
    fields: () => ({
        champion: {
            type: ChampionType,
            description: 'a single Champion',
            args: { name: { type: GraphQLString } },

            resolve: (parent, args) => {
                let championName = args.name.toLowerCase();
                // console.log(championData.name);
                let baseDataPath = `../../data/lol/baseData/${championName}_data.json`;
                let currentPath = path.resolve(__dirname, baseDataPath);
                let championData = JSON.parse(fs.readFileSync(currentPath, 'utf8'));
            },
        },
    }),
});

const schema = new GraphQLSchema({
    query: RootQueryType,
    // mutation: RootMutationType,
});

const lol_gQL_baseStats = graphqlHTTP({
    schema: schema,
    graphiql: true,
});

module.exports = lol_gQL_baseStats;
