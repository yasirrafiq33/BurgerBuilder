import React, { Component } from 'react';
import Layout from './containers/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
class App extends Component {
  render() {
    return (
      <div>
          <h1>Hello React</h1>
          <Layout>
            <BurgerBuilder/>
          </Layout>
      </div>
    );
  }
}

export default App;