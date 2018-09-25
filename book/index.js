'use strict';

const Seneca = require('seneca');
const DB = require('./db');

const db = new DB();

const query = { query: 'book' };
const mutation = { mutation: 'book' };

const service = Seneca({log: 'warn'});

service.add(query, function ({ id }, reply) {
    reply(null, db.get(id));
});

service.add(mutation, function ({ name, author_id }, reply) {
    reply(null, db.set({ name, author_id }));
});

service.listen();