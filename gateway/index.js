'use strict';

const { ApolloServer } = require('apollo-server');
const Merge = require('./lib/merge');
const Seneca = require('seneca');

const service = Seneca({log: 'warn'});

const act = function (clientOptions, e, args) {
    const client = service.client(clientOptions);

    return new Promise((resolve, reject) => {
        console.log(`triggered ${JSON.stringify(e)} : ${JSON.stringify(args)}`);
        client.act(e, args, function (error, result) {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const server = new ApolloServer({
    schema: Merge([require('./partials/author'), require('./partials/book')]),
    context: async (request) => {
        return { act, request };
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});