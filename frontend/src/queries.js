import gql from 'graphql-tag';

export const GET_SUBJECTS = gql`
  query($paginationInput: PaginationInput!) {
    subjects(paginationInput: $paginationInput) {
      result {
        id,
        name,
      }
    }
  }
`;

export const GET_ADVERTS = gql`
  query($advertFilter: AdvertFilter!) {
    adverts(advertFilter: $advertFilter) {
      result {
        teacher {
          firstName,
        },
        subject {
          name,
        },
        place,
        price,
        time,
      }
    }
  }
`;