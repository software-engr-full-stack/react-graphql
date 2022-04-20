import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client';

import { loader } from 'graphql.macro';

import humps from 'humps';

const query = loader('../query.graphql');

export default function api() {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
  });

  client
    .query({
      query
    })
    .then(result => {
      const usersAPI = result.data.users.map((user) => ({
        ...user,
        data: JSON.parse(user.data.replace('=>' ,':'))
      }));

      const users = humps.camelizeKeys(usersAPI);

      console.log({ users, usersAPI });
    });
  // client
  //   .query({
  //     query: gql`
  //       query {
  //         users {
  //           id
  //           name
  //           data
  //         }
  //       }
  //     `
  //   })
  //   .then(result => {
  //     const users = result.data.users.map((user) => ({
  //       ...user,
  //       data: JSON.parse(user.data.replace('=>' ,':'))
  //     }));

  //     console.log({ users });
  //   });
}
