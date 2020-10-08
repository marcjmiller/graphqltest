import TodoRow from '../Components/TodoRow';
import { render } from '@testing-library/react';
import React from 'react';
import TodoModel from '../Models/TodoModel';
import { MockedProvider } from '@apollo/client/testing';
import { FETCH_TODOS } from '../Queries/FETCH_TODOS';
import { COMPLETE_TODO } from '../Mutations/COMPLETE_TODO';

const mocks = [
  {
    request: {
      query: COMPLETE_TODO,
    },
    result: {
      data: {
        todos: [
          {
            id: 1,
            text: 'Get stuff done',
            completed: true,
          },
        ],
      },
    },
  },
];

describe('TodoRow test', () => {
  const todo = new TodoModel(1, 'Get stuff done', false);
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TodoRow todo={todo}/>
    </MockedProvider>,
  );

  it('should render given information', () => {
    expect(container.textContent).toContain('Get stuff done');
  });
});
