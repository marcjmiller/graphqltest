import React from 'react';
import { gql, useMutation } from '@apollo/client';
import TodoModel from '../Models/TodoModel';

interface MyProps {
  todo: TodoModel;
}

export const COMPLETE_TODO = gql`
    mutation completeTodo($id: Int!) {
        completeTodo(id: $id) {
            id
            text
            completed
        }
    }
`;

export const DELETE_TODO = gql`
    mutation deleteTodo($id: Int!) {
        deleteTodo(id: $id) {
            id
            text
            completed
        }
    }
`;

const TodoRow: React.FC<MyProps> = ({ todo }) => {
  const { id, text, completed } = todo;
  const [ completeTodo ] = useMutation(COMPLETE_TODO);
  const [ deleteTodo ] = useMutation(DELETE_TODO);

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
