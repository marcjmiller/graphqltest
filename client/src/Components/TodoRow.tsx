import React from 'react';
import { useMutation } from '@apollo/client';
import TodoModel from '../Models/TodoModel';
import { COMPLETE_TODO } from '../Mutations/COMPLETE_TODO';
import { DELETE_TODO } from '../Mutations/DELETE_TODO';
import { Button, Checkbox, TableCell, TableRow, Typography } from '@material-ui/core';

interface MyProps {
  todo: TodoModel;
}

const TodoRow: React.FC<MyProps> = ({ todo }) => {
  const { id, text, completed } = todo;
  const [ completeTodo ] = useMutation(COMPLETE_TODO);
  const [ deleteTodo ] = useMutation(DELETE_TODO, {
                                       update(cache, { data }) {
                                         const deletedTodoId = 'Todo:' + data.deleteTodo.id.toString();
                                         cache.evict({ id: deletedTodoId });
                                       },
                                     },
  );

  return (
    <TableRow key={id} hover>
      <TableCell data-testid={'todo-text'} align={'left'}>
        <Typography>{text}</Typography>
      </TableCell>
      <TableCell data-testid={'todo-completed'} align={'center'}>
        <Checkbox
          name={'completed'}
          checked={completed}
          onChange={() => {
            completeTodo({ variables: { id: id } });
          }}
        />
      </TableCell>
      <TableCell align={'center'}>
        <Button
          onClick={() => {
            deleteTodo({ variables: { id: id } });
          }}
          color={'primary'}
          variant={'contained'}
          fullWidth={true}
        >
          delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TodoRow;
