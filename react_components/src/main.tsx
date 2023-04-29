import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { store } from './common/store';
import { Provider } from 'react-redux';

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
