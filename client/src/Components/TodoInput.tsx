import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

export const ADD_TODO = gql`
    mutation createTodo($text: String!) {
        createTodo(input: {text: $text}) {
            id
            text
            completed
        }
    }
`;

const TodoInput: React.FC = () => {
  const [ todoInput, setTodoInput ] = useState('');

  const [ createTodo, { loading: mutationLoading, error: mutationError } ] = useMutation(ADD_TODO, {
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

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          createTodo({ variables: { text: todoInput } });
          setTodoInput('');
        }}
      >
        <input
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder={'TodoRow text'}
        />
        <button type={'submit'}>add</button>
      </form>
      {mutationLoading && <p>Mutation Submitting...</p>}
      {mutationError && <p>Mutation Error, see console :(</p>}
    </div>
  );
};

export default TodoInput;
