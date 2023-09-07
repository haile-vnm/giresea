import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getField } from '../../lib/localstorage';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const getAuthorizationToken = () => `Bearer ${getField('github-personal-token')}`;

const githubLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: getAuthorizationToken(),
    }
  };
});

export const client = new ApolloClient({
  link: githubLink.concat(httpLink),
  cache: new InMemoryCache(),
});
