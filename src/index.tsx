import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const apiUrl = "https://4rn51w3mm9.lp.gql.zone/graphql";

const httpLink = createHttpLink({ uri: apiUrl });

const authLink = new ApolloLink((operation, forward) => {
  const token = '';
  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return forward(operation);
});

const logLink = onError(error => console.error("Apollo Error", error)); // as any

const link = logLink.concat(authLink.concat(httpLink)); // as any

/*
TS2345: Argument of type 'ApolloLink' is not assignable to parameter of type 'ApolloLink | RequestHandler'.
  Type 'ApolloLink' is not assignable to type 'RequestHandler'.
    Type 'ApolloLink' provides no match for the signature '(operation: Operation, forward?: NextLink): Observable<FetchResult<Record<string, any>, Record<string, any>>>'.
*/

export const graphql = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

const App = () => (
  <div style={styles}>
    <Hello name="CodeSandbox" />
    <h2>Start editing to see some magic happen {"\u2728"}</h2>
  </div>
);

render(<App />, document.getElementById("root"));
