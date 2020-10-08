import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_TODO } from '../Mutations/ADD_TODO';

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
          if (todoInput !== '') {
            createTodo({ variables: { text: todoInput } });
            setTodoInput('');
          }
        }}
      >
        <input
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder={'New todo text'}
        />
        <button type={'submit'} disabled={todoInput === ''}>add</button>
      </form>
      {mutationLoading && <p>Mutation Submitting...</p>}
      {mutationError && <p>Mutation Error, see console :(</p>}
    </div>
  );
};

export default TodoInput;
