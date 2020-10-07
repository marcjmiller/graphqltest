import React from 'react';
import { gql, useQuery } from '@apollo/client';
import TodoRow from './TodoRow';
import TodoModel from '../Models/TodoModel';
import TodoInput from './TodoInput';

interface TodoData {
  todos: Array<TodoModel>;
}

export const TODO_QUERY = gql`
    query getTodos{
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
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <table>
                <thead>
                <tr>
                  <th>Text</th>
                  <th>Completed</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.todos.map(todo => (
                  <TodoRow todo={todo} key={todo.id}/>
                ))}
                </tbody>
              </table>
              <TodoInput/>
            </div>
            : null
      }
    </div>
  );
};

export default TodoTable;
