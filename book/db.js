'use strict';

const CUID = require('cuid');

class DB {
    constructor() {
        this.data = {
            'cj9rid70m0001ridq43m0n7qv': {
                id: 'cj9rid70m0001ridq43m0n7qv',
                name: 'The Hobbit',
                author_id: 'cj9ribob50000ridq580knp6j'
            }
        };
    }
    get(id) {
        console.log(`fetched ${JSON.stringify(this.data[id])}`);
        return this.data[id];
    }
    set(value) {
        const data = Object.assign({ id : CUID() }, value);
        this.data[data.id] = data;
        console.log(`inserted: ${JSON.stringify(data)}`);
        return this.data[data.id];
    }
}

module.exports = DB;
