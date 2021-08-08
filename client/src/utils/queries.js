import { gql } from '@apollo/client';

export const QUERY_RESTAURANTS = gql`
  query allRestaurants {
    restaurants {
      _id
      name
      passcode
      logoUrl
      maxPoint
      offerOne
      offerTwo
      barcode
    }
  }
`;


export const QUERY_VISITS = gql`
  query allVisits {
    visits {
      restaurantName
      restaurantId
      maxPoint
      offerOne
      offerTwo
      activeTemplate
      visitDate
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      email
    }
  }
`;
