import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_TODO } from '../Mutations/ADD_TODO';
import { Button, Snackbar, TableCell, TableRow, TextField } from '@material-ui/core';

const TodoInput: React.FC = () => {
  const [ todoInput, setTodoInput ] = useState('');
  const [ open, setOpen ] = useState(false);

  const [ createTodo, { error: mutationError } ] = useMutation(ADD_TODO, {
    update(cache, { data: { createTodo } }) {
      cache.modify(
          {
            fields: {
              todos(existingTodos = []) {
                const newTodoRef = cache.writeFragment(
                    {
                      data: createTodo,
                      fragment: gql`
                          fragment NewTodo on Todo {
                              id
                              text
                              completed
                          }
                      `,
                    },
                );
                return [ ...existingTodos, newTodoRef ];
              },
            },
          },
      );
    },
  });

  const handleAddTodo = () => {
    if (todoInput !== '') {
      createTodo({ variables: { text: todoInput } });
      setTodoInput('');
    }
  };

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <TableRow>
      <TableCell colSpan={2}>
        <TextField
          value={todoInput}
          fullWidth={true}
          onChange={(event) => setTodoInput(event.target.value)}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              handleAddTodo();
            }
          }}
          placeholder={'New todo text'}
        />
      </TableCell>
      <TableCell>
        <Button
          disabled={todoInput === ''}
          onClick={handleAddTodo}
          color={'primary'}
          variant={'contained'}
          fullWidth={true}
        >
          add
        </Button>
      </TableCell>
      <Snackbar
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        message={'Mutation Error, see console :('}
        onClose={handleClose}
        autoHideDuration={5000}
      />
      {mutationError && console.log(mutationError)}
    </TableRow>
  );
};

export default TodoInput;
