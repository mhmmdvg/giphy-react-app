import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import SearchForm from './SearchForm';

test('renders search form component', () => {
  render(<SearchForm onChange={() => null} onSubmit={() => null} />);

  const searchInput = screen.getByTestId('content-input');
  fireEvent.change(searchInput, { target: { value: 'test' } });
  expect((searchInput as HTMLInputElement).value).toBe('test');
});

test('renders search form submit', () => {
  render(<SearchForm onChange={() => null} onSubmit={() => null} />);

  const submit = screen.getByTestId('submit');
  fireEvent.submit(submit);
});
