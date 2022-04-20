import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Search from './Search';
import store from '../../redux/store';

test('renders search pages', () => {
  render(
    <Provider store={store}>
      <Search />
    </Provider>,
    { wrapper: MemoryRouter }
  );
});
