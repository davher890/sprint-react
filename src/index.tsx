import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './app/App';
import store from "./app/redux/reducers/index";

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Theme';

ReactDOM.render(
  
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
