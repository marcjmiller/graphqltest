import React from 'react';
import { gql, useQuery } from '@apollo/client';

interface TodoData {
  todos: Array<{ id: number, text: string, completed: boolean }>;
}

const TODO_QUERY = gql`
    {
        todos {
            id
            text
            completed
        }
    }
`;

const Todos: React.FC = () => {
  const { loading, error, data } = useQuery<TodoData>(TODO_QUERY);

  return (
    <div>
      <h3>To Do</h3>
      {loading ? <p>Loading ...</p> :
        error ? <p>Uh oh! {error.message}</p> :
          data && data.todos !== undefined ?
            <table>
              <thead>
              <tr>
                <th>Text</th>
                <th>Completed</th>
              </tr>
              </thead>
              <tbody>
              {data.todos.map(todo => (
                <tr key={todo.id}>
                  <td>{todo.text}</td>
                  <td><input type={'checkbox'} name={'completed'} checked={todo.completed}/></td>
                </tr>
              ))}
              </tbody>
            </table>
            : null}
    </div>
  );
};

export default Todos;
