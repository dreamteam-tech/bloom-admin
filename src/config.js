const endpoint = process.env.NODE_ENV === 'production' ? 'https://api.good-like.club' : 'http://localhost:4000';

module.exports = {
  graphqlEndpoint: `${endpoint}/graphql`,
  endpoint
};
