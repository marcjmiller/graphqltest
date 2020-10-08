import TodoTable from '../Components/TodoTable';
import React from 'react';
import { render, cleanup, findByTestId, waitForElement } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { FETCH_TODOS } from '../Queries/FETCH_TODOS';

const mocks = [
  {
    request: {
      query: FETCH_TODOS,
    },
    result: {
      data: {
        todos: [
          {
            id: 1,
            text: 'Get stuff done',
            completed: false,
          },
        ],
      },
    },
  },
];

describe('TodoTable tests', () => {
  afterEach(cleanup);

  it('should render without error', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TodoTable/>
      </MockedProvider>,
    );

    const todoTextElement = await waitForElement(() => getByTestId('todo-text'));
    const todoCompletedElement = await waitForElement(() => getByTestId('todo-completed'));

    expect(todoTextElement.textContent).toEqual('Get stuff done');
    expect(todoCompletedElement).toBeTruthy();
  });
});
