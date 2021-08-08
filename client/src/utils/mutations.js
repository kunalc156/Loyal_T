import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($signup_username: String!, $signup_email: String!, $signup_password: String!) {
    addProfile(name: $signup_username, email: $signup_email, password: $signup_password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_VISIT = gql`
  mutation addVisit($restaurantId: ID!) {
    addVisit(restaurantId: $restaurantId) {
     _id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_PROFILE = gql`
mutation removeProfile($id: String!) {
  removeProfile(id: $id) {
    _id
    name
  }
}
`;
