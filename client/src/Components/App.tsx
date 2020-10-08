import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../apolloClient';
import TodoTable from './TodoTable';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h2>
          A to do list powered by GraphQL, Typescript, Apollo, and React.
        </h2>
        <img src={'gtar-logos.png'} alt={'logos'}/>
      </div>
      <TodoTable/>
    </ApolloProvider>
  );
};

export default App;
