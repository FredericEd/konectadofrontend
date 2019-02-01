import React, { Component } from 'react';
import SweetAlert from 'sweetalert-react';
import logo from './logo.svg';
import './App.css';
import 'sweetalert/dist/sweetalert.css';

class App extends Component {

  
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
    };
  }
  render() {
    return (
      <div className="App">
         <div>
          <button onClick={() => this.setState({ show: true })}>Alert</button>
          <SweetAlert
            show={this.state.show}
            title="Demo"
            text="SweetAlert in React"
            onConfirm={() => this.setState({ show: false })}
          />
        </div>
      </div>
    );
  }
}

export default App;
