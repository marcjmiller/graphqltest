import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../apolloClient';
import TodoTable from './TodoTable';
import { CssBaseline, Typography } from '@material-ui/core';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <div className="App">
        <Typography variant={'h4'}>
          A to do list powered by GraphQL, Typescript, Apollo, and React.
        </Typography>
        <img src={'gtar-logos.png'} alt={'logos'}/>
      </div>
      <TodoTable/>
    </ApolloProvider>
  );
};

export default App;
