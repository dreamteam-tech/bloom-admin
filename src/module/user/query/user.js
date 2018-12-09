import gql from 'graphql-tag';

export const refreshTokenMutation = gql`
  mutation refreshToken($token: String) {
    refreshToken(token: $token) {
      refreshToken
      accessToken
    }
  }
`;

export const loginMutation = gql`
  mutation login($phone: String, $password: String) {
    login(phone: $phone, password: $password) {
      refreshToken
      accessToken
    }
  }
`;

export const usersQuery = gql`
  query users {
    users {
      id
      first_name
      last_name
      phone
      vk_id
      is_active
      is_admin
      created_at
    }
  }
`;

export const userQuery = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      first_name
      last_name
      phone
      vk_id
      is_active
      is_admin
      created_at
    }
  }
`;