import React from 'react';
import { Login } from '../login';
import { render, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

afterEach(cleanup);

describe('Login view', () => {

  test('renders button', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]}>
        <Login />
      </MockedProvider>);
    expect(getByTestId('login-button')).toHaveTextContent('Zaloguj się')
  })
})
