import 'isomorphic-unfetch';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: process.env.API_ENDPOINT
  }),
  cache: new InMemoryCache()
});
