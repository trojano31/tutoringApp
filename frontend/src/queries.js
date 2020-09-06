import { gql } from '@apollo/client';

export const GET_SUBJECTS = gql`
query subjects(paginationInput: PaginationInput!) {
  SubjectList {
      result,
    }
  }
`;