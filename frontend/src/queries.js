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