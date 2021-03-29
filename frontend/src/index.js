import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: { 
      main: '#000',
      // contrastText: '#fff',
    },
    secondary: { 
      main: purple[500], 
      // contrastText: '#fff', 
    },
  }, 
  typography: {
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      '@media (max-width:767px)': {
        // fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
    button: {
      textTransform: 'none'
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
