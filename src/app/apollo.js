import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://kap-api.kollegeapply.in/Kapapi/graphql/?u=Kappapply&p=graphql@kapp',

  //  uri: 'https://kollegeapply.in:8000/Kapapi/graphql/?u=Kappapply&p=graphql@kapp',

  cache: new InMemoryCache(),
});

export default client;
