import React from 'react';
import { useMutation } from '@apollo/client';
import TodoModel from '../Models/TodoModel';
import { COMPLETE_TODO } from '../Mutations/COMPLETE_TODO';
import { DELETE_TODO } from '../Mutations/DELETE_TODO';

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
    <tr key={id}>
      <td data-testid={'todo-text'}>
        {text}
      </td>
      <td data-testid={'todo-completed'}>
        <input type={'checkbox'}
               name={'completed'}
               checked={completed}
               onChange={() => {
                 completeTodo({ variables: { id: id } });
               }}
        />
      </td>
      <td>
        <button onClick={() => {
          deleteTodo({ variables: { id: id } });
        }}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default TodoRow;
