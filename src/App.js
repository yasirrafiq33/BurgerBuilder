import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
class App extends Component {

    componentDidMount() {
        console.log('hello app I am here!');
        this.props.onTryAutoSignup();
    }

  render() {
        let routes = (
            <Switch>
                <Route path="/auth" render={() => <Suspense fallback={<div>Loading ...</div>}>
                    <Auth/></Suspense>}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to='/'/>
            </Switch>
        );
        if(this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" render={() => <Suspense fallback={<div>Loading ...</div>}>
                        <Orders/></Suspense>}/>
                    <Route path="/logout" component={Logout}/>
                    {/*<Redirect to='/'/>*/}
                </Switch>
            );
        }
    return (
      <div>
          <h1>Hello React</h1>
          <Layout>
              {routes}
          </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};
const mapDispatchToProps = dispatch => {
    return{
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App));