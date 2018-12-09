import gql from 'graphql-tag';

export const strategiesQuery = gql`
  query strategies {
    strategies {
      id
      name
      description
      percent
    }
  }
`;

export const strategyQuery = gql`
  query strategy($id: ID!) {
    strategy(id: $id) {
      id
      name
      description
      percent
    }
  }
`;

export const strategyRemoveMutation = gql`
  mutation strategyRemove($id: ID!) {
    strategyRemove(id: $id)
  }
`;

export const strategyUpdateMutation = gql`
  mutation strategyUpdate($id: ID!, $name: String, $description: String, $percent: Float) {
    strategyUpdate(id: $id, name: $name, description: $description, percent: $percent) {
      id
      name
      description
      percent
    }
  }
`;

export const strategyCreateMutation = gql`
  mutation strategyCreate($name: String, $description: String, $percent: Float) {
    strategyCreate(name: $name, description: $description, percent: $percent) {
      id
      name
      description
      percent
    }
  }
`;