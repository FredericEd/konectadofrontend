import React, { Component } from 'react';
import Login from './components/Layout/Login';
import Main from './components/Main';
//import 'bootstrap/dist/js/bootstrap.min.js';

import './font-awesome/css/font-awesome.css';
import './css/bootstrap.css';
import './css/animate.css';
import './css/less.css';
import './css/style.css';
import './css/reactpicker.css';
import './css/plugins/dataTables/datatables.min.css';

class App extends Component {

  state = {
    isAuthenticated: false,
  }
  userHasAuthenticated = authenticated => {
    this.state.isAuthenticated != authenticated && this.setState({ isAuthenticated: authenticated });
  }
  render() {
    if (sessionStorage.getItem("token")) {
      this.userHasAuthenticated(true);
    }
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    };
    return this.state.isAuthenticated ? <Main childProps={childProps} /> : <Login childProps={childProps} />;
  }
}

export default App;