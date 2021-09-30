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
            description: 'a single Champion in combat',
            args: { champA: { type: GraphQLString }, champB: { type: GraphQLString } },

            resolve: (parent, args) => {
                let champA = args.champA.toLowerCase();
                let champB = args.champB.toLowerCase();
                console.log(champA);
                console.log(champB);
                let baseDataPath = `../../data/lol/combatData/combatStats_${champA}_vs_${champB}_data.json`;
                let currentPath = path.resolve(__dirname, baseDataPath);
                // try {
                let championData = JSON.parse(fs.readFileSync(currentPath, 'utf8'));
                console.log(championData.name);
                return championData;
                // } catch (err) {
                //     return { succes: false };
                // }
                // let championData = promiseReadFile(currentPath, 'utf8', (err, data) => {
                //     if (err) return console.error(err);
                //     else return data;
                // }).then((data) => {
                //     console.log(championData.name);
                //     return championData;
                // });
            },
        },
    }),
});

const schema = new GraphQLSchema({
    query: RootQueryType,
    // mutation: RootMutationType,
});

const lol_gQL_combatStats = graphqlHTTP({
    schema: schema,
    graphiql: true,
});

module.exports = lol_gQL_combatStats;
