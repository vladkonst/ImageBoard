import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Register } from './components/Register';
import { Counter } from './components/Counter';

import './custom.css'
import { Login } from './components/Login';
import { UserManager } from './components/UserManagment';
import { Logout } from './components/Logout';
import { BoardManager } from './components/BoardManagment';
import { Board } from './components/Threads';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/users/' component={UserManager} />
            <Route path='/logout/' component={Logout} />
            <Route path='/boards-manager/' component={BoardManager} />
            <Route path='/boards/:name?' component={Board} />
      </Layout>
    );
  }
}
