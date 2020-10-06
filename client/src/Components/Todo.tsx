import * as React from 'react';

interface MyProps {
  todo: {
    id: number,
    text: string,
    completed: boolean
  };
}

const Todo: React.FC<MyProps> = (props) => {
  const { text, completed } = props.todo;
  return (
    <tr>
      <td data-testid={'todo-text'}>
        {text}
      </td>
      <td data-testid={'todo-completed'}>
        <input type={'checkbox'} name={'completed'} checked={completed} readOnly/>
      </td>
    </tr>
  );
};

export default Todo;
