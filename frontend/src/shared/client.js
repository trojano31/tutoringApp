import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

const httpLink = createHttpLink({
  uri: `http://${window.location.hostname}:5000/graphql`,
  credentials: 'include'
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log('message', message) &&
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`)
});

const cache = new InMemoryCache();

const Client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache
});

export default Client;
