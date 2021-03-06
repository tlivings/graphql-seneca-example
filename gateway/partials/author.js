
const clientOptions = {
    type: 'http',
    host: 'author-service'
};

const types = `
    # An author.
    type Author {
        id: ID!
        # The author name.
        name: String,
        # The author email.
        email: String
    }
`;

const rootTypes = `
    type Query {
        # Seach for an author by id.
        author(id: ID!, version: String) : Author
    }
    type Mutation {
        # Create a new book.
        author(name: String!) : Author
    }
`;

const resolvers = {
    Query: {
        author(_, { id, version }, { act }) {
            return act(clientOptions, { query: 'author', version }, { id });
        }
    },
    Mutation: {
        author(_, { name }, { act }) {
            return act(clientOptions, { mutation: 'author' }, { name });
        }
    }
};

module.exports = { types, rootTypes, resolvers };
