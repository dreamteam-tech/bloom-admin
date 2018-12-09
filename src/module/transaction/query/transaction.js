import gql from 'graphql-tag';

export const transactionsQuery = gql`
  query transactions {
    transactions {
      id
      amount
      created_at
      strategy {
        id
        name
        description
        percent
      }
      user {
        id
        phone
        last_name
        first_name
        created_at
      }
    }
  }
`;

export const transactionQuery = gql`
  query transaction($id: ID!) {
    transaction(id: $id) {
      id
      amount
      created_at
      strategy {
        id
        name
        description
        percent
      }
      user {
        id
        phone
        last_name
        first_name
        created_at
      }
    }
  }
`;

export const transactionRemoveMutation = gql`
  mutation transactionRemove($id: ID!) {
    transactionRemove(id: $id)
  }
`;
