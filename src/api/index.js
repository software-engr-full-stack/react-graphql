import {
  ApolloClient,
  InMemoryCache
} from '@apollo/client';

import { loader } from 'graphql.macro';

const query = loader('../query.graphql');

export default function api() {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
  });


  client.query({
    query
  })
  .then(result => {
    const users = result.data.users.map((user) => ({
      ...user,
      data: JSON.parse(user.data.replace('=>' ,':'))
    }));

    console.log({ users });
  });
}
