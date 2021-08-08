const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
  }

  type Restaurant {
    _id: ID
    name: String
    passcode: String
    logoUrl: String
    maxPoint: Int
    offerOne: String
    offerTwo: String
    activeTemplate: Int
    barcode: String
  }
 
  type VisitHistory {
    _id: ID
  }

  type Checkin{
    restaurantName: String
    restaurantId: ID
    maxPoint: Int
    offerOne: String
    offerTwo: String
    activeTemplate: Int
    visitDate: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    restaurants:[Restaurant]!
    visits: [Checkin]
    me: Profile
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addVisit(restaurantId: ID!): VisitHistory
    removeProfile(id: String!): Profile
  }
`;

module.exports = typeDefs;
