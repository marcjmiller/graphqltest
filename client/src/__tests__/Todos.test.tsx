import Todos, { TODO_QUERY } from '../Todos';
import React from 'react';
import { render, cleanup, findByTestId, waitForElement } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

const mocks = [
  {
    request: {
      query: TODO_QUERY,
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

describe('Todos tests', () => {
  afterEach(cleanup);

  it('should render without error', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Todos/>
      </MockedProvider>,
    );

    const todoTextElement = await waitForElement(() => getByTestId(`todo-text`));
    const todoCompletedElement = await waitForElement(() => getByTestId('todo-completed'));

    expect(todoTextElement).toBeTruthy();
    expect(todoCompletedElement).toBeTruthy();
  });
});
