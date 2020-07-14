import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Profile from './Components/Pages/Profile';
import Experts from './Components/Pages/Experts';
import Learners from './Components/Pages/Learners';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/profile" component={Profile} />
      <Route path="/experts" component={Experts} />
      <Route path="/learners" component={Learners} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
