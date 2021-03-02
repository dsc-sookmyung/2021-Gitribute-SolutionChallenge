import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Common/NavBar';
import About from './components/About/About';
import CenterInfo from './components/CenterInfo/CenterInfo';
import Join from './components/SignUp/Join';
import Login from './components/SignIn/Login';
import FAQ from './components/FAQ/FAQ';
import Contact from './components/Contact/Contact';
import PasswordReset from './components/PasswordReset/PasswordReset';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

// const pointColors = ['#4379B7', '#0D2D84']; // 연한 파랑, 코발트 블루

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
      </Switch>
    </Router>
  );
}

export default App;