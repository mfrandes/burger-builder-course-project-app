import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignin();
  }

  render() {
    return (
      <div >
        <Layout>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component= {Logout}/>
          <Route path="/" exact component={BurgerBuilder} />
        </Layout>
      </div>
    );
  }
}

const mapDisptachToProps = dispatch => {
  console.log('Bazinga!');
  
  return {
    onTryAutoSignin : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDisptachToProps)(App));

//connect breaks the routing in app so we need to add withRouter high order component to fix this issue