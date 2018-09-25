/*
This file is just used to detect if the registered types include any "extend type Query", "extend type Mutation"
or "extend type Subscription" root type statements, and if so adds "empty" root types so these can be added.
*/

const rootTypeRegex = function (rootType) {
    return new RegExp(`\\bextend\\s+type\\s+${rootType}\\s*{([\\S\\s]*?)}`, 'gim');
}

const rootTypeDef = function (rootType) {
    return `
    # The root-level ${rootType.toLowerCase()} object
    type ${rootType} {
        # This null attribute just makes it easy to join multiple schemas. It is a no-op and is not intended to be used.
        _null: String @deprecated
    }`;
}

const rootTypeResolver = function (rootType) {
    return {
        [rootType]: {
            _null: function() { return ''; }
        }
    };
}

const addRootGraphqlTypeIfNecessary = function (rootTypeName, types, resolvers) {
    const rootTypes = [];

    for (const type of types) {
        if (type.match(rootTypeRegex(rootTypeName))) {
            rootTypes.push(rootTypeDef(rootTypeName));
            resolvers.push(rootTypeResolver(rootTypeName));
            break;
        }
    }

    types.unshift(...rootTypes);
}

const addEmptyRootTypes = function (types, resolvers) {
    addRootGraphqlTypeIfNecessary('Query', types, resolvers);
    addRootGraphqlTypeIfNecessary('Mutation', types, resolvers);
    addRootGraphqlTypeIfNecessary('Subscription', types, resolvers);
}

module.exports = addEmptyRootTypes;
