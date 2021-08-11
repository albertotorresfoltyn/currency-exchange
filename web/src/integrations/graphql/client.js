import { ApolloClient, InMemoryCache } from "@apollo/client";
import { backendUri } from "../../config";
const API_URL = `${backendUri}/graphql`;

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default client;
