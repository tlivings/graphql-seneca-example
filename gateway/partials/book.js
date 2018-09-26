
const clientOptions = {
    type: 'http',
    host: 'book-service'
};

const types = `
    # This is a book.
    type Book {
        id: ID!
        # The name of the book.
        name: String,
        # The book's author.
        author: Author
    }
`;

const rootTypes = `
    type Query {
        # Search for a book by id.
        book(id: ID!) : Book
    }
    type Mutation {
        # Create a new book.
        book(name: String!, author_id: ID!) : Book
    }
`

const resolvers = {
    Query: {
        book(_, { id }, { act }) {
            return act(clientOptions, { query: 'book' }, { id });
        }
    },
    Mutation: {
        book(_, { name, author_id }, { act }) {
            return act(clientOptions, { mutation: 'book' }, { name, author_id });
        }
    },
    Book: {
        author(book, args, { act }) {
            return act({ type: 'http', host: 'author-service' }, { query: 'author' }, { id: book.author_id });
        }
    }
};

module.exports = { types, rootTypes, resolvers };
