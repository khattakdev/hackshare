import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './pages/Profile';
import Experts from './pages/Experts';
import Learners from './pages/Learners';
import Landing from './pages/Landing';
import Fallback from './pages/Fallback';

const Router = () => {
  const routes = [{
    path: '/profile',
    component: Profile
  },{
    path: '/experts',
    component: Experts
  },{
    path: '/learners',
    component: Learners
    }]
  
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      {routes.map((route, i) => isAuthenticated ? <Route {...route} key={i} /> : 
        <Redirect
          to={{
            pathname: "/",
            state: { from: location }
          }}
          key={i}
        />)}
      <Route exact path="*" component={Fallback} />
    </Switch>
  );
}

export default Router