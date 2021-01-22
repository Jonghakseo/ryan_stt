import { ThemeProvider } from '@material-ui/core';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import React from 'react';
import { render } from 'react-dom';
import App from './App';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Noto Sans KR, sans-serif',
  },
});

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
