import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import TodoTable from './Components/TodoTable';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <p>
          To dos, powered by React, GraphQL, and Apollo.
        </p>
      </div>
      <TodoTable/>
    </ApolloProvider>
  );
};

export default App;
