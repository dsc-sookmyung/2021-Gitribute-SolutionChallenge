import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Common/NavBar';
import About from './components/About/About';
import CenterInfo from './components/CenterInfo/CenterInfo';
import Join from './components/SignUp/Join';
import Login from './components/SignIn/Login';
import PasswordForgot from './components/PasswordReset/ForgotPassword';
import PasswordReset from './components/PasswordReset/PasswordReset';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fff",
    height: "100vh"
  }
}))

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <Navbar />
        <Switch>
          <Route path='/' exact component={About} />
          <Route path='/center' component={CenterInfo} />
          <Route path='/join' component={Join} />
          <Route path='/login' component={Login} />
          <Route path='/password_reset' component={PasswordReset} />
          <Route path='/password_forgot' component={PasswordForgot} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
