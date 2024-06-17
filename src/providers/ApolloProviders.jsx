"use client"

import { ApolloProvider } from "@apollo/client";
import client from "@/app/apollo";

const ApolloProviders = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviders;
