import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders app text', () => {
  const { getByText } = render(<App />);
  const element = getByText('To dos, powered by React, GraphQL, and Apollo.');
  expect(element).toBeInTheDocument();
});
