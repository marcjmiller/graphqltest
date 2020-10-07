import React from 'react';
import { gql, useMutation } from '@apollo/client';
import TodoModel from '../Models/TodoModel';

interface MyProps {
  todo: TodoModel;
}

export const COMPLETE_TODO = gql`
    mutation completeTodo($id: Int!){
        completeTodo(id: $id) {
            id
            text
            completed
        }
    }
`;

const TodoRow: React.FC<MyProps> = ({ todo }) => {
  const { id, text, completed } = todo;
  const [ completeTodo ] = useMutation(COMPLETE_TODO);

  return (
    <tr key={id}>
      <td data-testid={'todo-text'}>
        {text}
      </td>
      <td data-testid={'todo-completed'}>
        <input type={'checkbox'} name={'completed'} checked={completed} readOnly/>
      </td>
      <td>
        <button onClick={() => {
          completeTodo({ variables: { id: id } })
        }}>
          toggle
        </button>
      </td>
    </tr>
  );
};

export default TodoRow;
