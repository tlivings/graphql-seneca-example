'use strict';

const { mergeSchemas, makeExecutableSchema } = require('graphql-tools');

function merge(partials) {
    const schemas = [];

    for (const partial of partials) {
        schemas.push(makeExecutableSchema({
            typeDefs: [partial.rootTypes, ...partials.map((partial) => partial.types)],
            resolvers: partial.resolvers
        }));
    }

    const mergedSchema = mergeSchemas({
        schemas
    });

    return mergedSchema;
};

module.exports = merge;
