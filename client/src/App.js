import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Profile from './Pages/Profile';
import Experts from './Pages/Experts';
import Learners from './Pages/Learners';

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {JSON.stringify(error)}</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        Hello {user.name} {/* @TODO: Switch to React Router */}
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </button>
      </div>
    );
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
}

export default function BasicExample() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/profile" component={Profile} />
        <Route path="/experts" component={Experts} />
        <Route path="/learners" component={Learners} />
      </Switch>
    </Router>
  );
}
