import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Profile from './pages/Profile';
import Experts from './pages/Experts';
import Learners from './pages/Learners';
import Landing from './pages/Landing';

const LoginButton = (props) => {
  return (
    <button onClick={props.onclick}>{props.children}</button>
  )
}


const App = (props) => {
  const {
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const handleLogout = () => logout({ returnTo: window.location.origin })
  const handleLogin = () => loginWithRedirect()
    return (
      <div>
        {isAuthenticated ? <LoginButton onclick={handleLogout}>Log out</LoginButton> : <LoginButton onclick={handleLogin}>Log in</LoginButton> }
        { error && <div>Oops, Somethign went wrong... {JSON.stringify(error)}</div> }
        { user && user.name }
        { props.children }
      </div>
    );
}

export default function Routing() {
  return (
    <App>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/profile" component={Profile} />
          <Route path="/experts" component={Experts} />
          <Route path="/learners" component={Learners} />
        </Switch>
      </Router>
    </App>
  );
}
