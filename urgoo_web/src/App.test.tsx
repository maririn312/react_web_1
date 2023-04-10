import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import translation from "./i18n/mn/translation.json";


describe('urgoo nomadx', () => {
  const initialState = { 
    user:{
      username: 'khatnaa'
    },
    addWallet: {
      wallet:{
        id: 'wallet1'
      }
    }
  };
  const mockStore = configureStore();
  let store;

  test('renders learn react link', () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <App />
      </Provider>,
      {wrapper: BrowserRouter} 
    );
    const linkElement = screen.getAllByTestId("urgoo-test");
  });
});