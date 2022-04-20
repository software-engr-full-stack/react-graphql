import {
  ApolloClient,
  InMemoryCache
} from '@apollo/client';

import { loader } from 'graphql.macro';

const usersQuery = loader('./users.graphql');

export default function api() {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
    credentials: 'same-origin'
  });

  return client.query({
    query: usersQuery
  })
  .then(result => {
    const users = result.data.users.map((user) => ({
      ...user,
      data: JSON.parse(user.data.replace('=>' ,':'))
    }));

    return { users };
  });
}
