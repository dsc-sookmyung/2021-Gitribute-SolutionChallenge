import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

export default createMuiTheme({
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      '@media (max-width:767px)': {
        fontSize: '2rem',
      },
    }
  },
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
})

