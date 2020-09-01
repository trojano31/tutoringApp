import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      email
      id
      lastName
    }
  }
`;

export const CREATE_ADVERT = gql`
  mutation($advert: AdvertInput!) {
    addAdvert(advert: $advert) {
      id
      place
      level
      price
      dateFrom
      dateTo
      time
      subject {
        name
      }
    }
  }
`;
