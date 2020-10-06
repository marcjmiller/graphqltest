import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Todo from './Todo';

interface TodoData {
  todos: Array<{ id: number, text: string, completed: boolean }>;
}

export const TODO_QUERY = gql`
    {
        todos {
            id
            text
            completed
        }
    }
`;

const TodoTable: React.FC = () => {
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
                <Todo todo={todo} key={todo.id}/>
              ))}
              </tbody>
            </table>
            : null
      }
    </div>
  );
};

export default TodoTable;
