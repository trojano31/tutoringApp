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
      subject
      place
      level
      price
      teacher
      dateFrom
      dateTo
      time
    }
  }
`;
