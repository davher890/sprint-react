import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
// import './index.css';
import App from './app/App';
import store from "./app/redux/store/index";

import { ThemeProvider } from '@material-ui/core';
import theme from './Theme';

ReactDOM.render(
  
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
