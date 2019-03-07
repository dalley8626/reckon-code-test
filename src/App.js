import React, { Component } from 'react';
import Reckon from './components/Reckon'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Reckon />

        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossorigin="anonymous"
        />
      </div>
    );
  }
}

export default App;
