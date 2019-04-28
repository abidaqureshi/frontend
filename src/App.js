import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout'
import ImportFiles from '../src/containers/importFiles/importFiles';


class App extends Component {
  render() {
    return (
              <Layout>
                <ImportFiles/>
              </Layout>
    );
  }
}

export default App;
