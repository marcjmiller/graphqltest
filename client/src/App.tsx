import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import Todos from './Todos';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <p>
          To dos, powered by React, GraphQL, and Apollo.
        </p>
      </div>
      <Todos/>
    </ApolloProvider>
  );
};

export default App;
