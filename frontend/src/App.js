import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Common/NavBar';
import About from './components/About/About';
import CenterInfo from './components/CenterInfo/CenterInfo';
import Join from './components/SignUp/Join';
import Login from './components/SignIn/Login';
import FAQ from './components/FAQ/FAQ';
import Contact from './components/Contact/Contact';
import PasswordForgot from './components/PasswordReset/ForgotPassword';
import PasswordReset from './components/PasswordReset/PasswordReset';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={About} />
        <Route path='/center' component={CenterInfo} />
        <Route path='/join' component={Join} />
        <Route path='/login' component={Login} />
        <Route path='/faq' component={FAQ} />
        <Route path='/contact' component={Contact} />
        <Route path='/password_reset' component={PasswordReset} />
        <Route path='/password_forgot' component={PasswordForgot} />
      </Switch>
    </Router>
  );
}

export default App;
