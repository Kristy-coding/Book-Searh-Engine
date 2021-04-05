// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// GraphQL demands that we explicitly define the type of data that is returning from the Models, queries, and mutations

const typeDefs = gql `

type Query {
    me: User
    user(username: String!): User
    users: [User]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors:[String], description: String, title: String!, image: String, link: String): User, bookId: String!
    removeBook(bookId: ID!): User
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: ID
    authors:[String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}
`;

module.exports= typeDefs;

