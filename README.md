
### Overview

Stripped down example of a GraphQL gateway using GraphQL components (partials).

Resolvers are backed by seneca microservices.

### Run

```bash
docker-compose up --build
```

### Demo

Hit http://localhost:4000/ for the GraphQL playground and enter a query. For example:

```graphql
query {
  book(id: "cj9rid70m0001ridq43m0n7qv") {
    id
    name
    author {
      id
      name
    }
  }
}
```

It should result in something like:

```json
{
  "data": {
    "book": {
      "id": "cj9rid70m0001ridq43m0n7qv",
      "name": "The Hobbit",
      "author": {
        "id": "cj9ribob50000ridq580knp6j",
        "name": "J.R.R Tolkien"
      }
    }
  }
}
```