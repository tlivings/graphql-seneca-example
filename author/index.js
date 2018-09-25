
const Seneca = require('seneca');
const DB = require('./db');

const db = new DB();

const query = { query: 'author' };
const mutation = { mutation: 'author' };

const service = Seneca({log: 'warn'});

service.add(query, function (message, reply) {
    reply(null, db.get(message.id));
});

service.add(mutation, function ({ name }, reply) {
    reply(null, db.set({ name }));
});

service.listen();