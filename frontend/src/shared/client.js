import { createHttpLink } from "apollo-link-http";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({ uri: "http://localhost:5000/" });

const cache = new InMemoryCache();

const Client = new ApolloClient({
    link: httpLink,
    cache
});

export default Client;
