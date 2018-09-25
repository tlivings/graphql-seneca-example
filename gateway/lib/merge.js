'use strict';

const LodashMerge = require('lodash.merge');
const AddEmptyRootTypes = require('./add_empty.js');
const GraphQLTools = require('graphql-tools');

function merge(partials) {
    const types = [];
    const resolvers = [];

    for (const partial of partials) {
        resolvers.push(partial.resolvers);
        Array.isArray(partial.types) ? types.push(...partial.types) : types.push(partial.types);
    }

    AddEmptyRootTypes(types, resolvers);

    const mergedResolvers = LodashMerge({}, ...resolvers);

    return GraphQLTools.makeExecutableSchema({ typeDefs: types, resolvers: mergedResolvers });
};

module.exports = merge;
