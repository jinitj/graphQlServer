const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type BlogPost {
    _id: ID!
    blogPostBody: String!
    creationTimeStamp: String!,
    creator: User!
}

type User {
    _id: ID!,
    email: String!,
    password: String,
    createdBlogPosts: [BlogPost!]
}

type AuthData {
    userId: ID!,
    token: String!,
    tokenExpiration: Int!
}

input UserInput {
    email: String!
    password: String!
}

input BlogPostInput {
    blogPostBody: String!
    creator: String
}

type RootQuery{
    blogPosts(limit: Int!, offset: Int!): [BlogPost!]!
    login(email: String!, password: String!): AuthData!
    newBlogPosts(timeStamp: String!): [BlogPost!]
}

type RootMutation {
    createBlogPost(blogPostInput: BlogPostInput): BlogPost
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}`) 