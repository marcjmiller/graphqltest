import React from 'react';
import { useQuery } from '@apollo/client';
import TodoRow from './TodoRow';
import TodoModel from '../Models/TodoModel';
import TodoInput from './TodoInput';
import { FETCH_TODOS } from '../Queries/FETCH_TODOS';
import {
  Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export interface TodoData {
  todos: Array<TodoModel>;
}

const useStyles = makeStyles(
  {
    container: {
      maxHeight: 500,
    },
  });

const TodoTable: React.FC = () => {
  const { loading, error, data } = useQuery<TodoData>(FETCH_TODOS);
  const classes = useStyles();

  return (
    <Container maxWidth={'md'}>
      <Typography variant={'h2'}>To Dos</Typography>
      {loading ? <p>Loading ...</p> :
        error ? <p>Uh oh! {error.message}</p> :
          data && data.todos !== undefined ?
            <TableContainer component={Paper} className={classes.container}>
              <Table size={'small'} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align={'left'}><Typography variant={'h5'}>Todo Text</Typography></TableCell>
                    <TableCell align={'center'}><Typography variant={'h5'}>Completed</Typography></TableCell>
                    <TableCell align={'center'}><Typography variant={'h5'}>Actions</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.todos.map(todo => (
                    <TodoRow todo={todo} key={todo.id}/>
                  ))}
                  <TodoInput/>
                </TableBody>
              </Table>
            </TableContainer>
            : null
      }
    </Container>
  );
};

export default TodoTable;
