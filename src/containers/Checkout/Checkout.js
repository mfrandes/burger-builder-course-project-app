import React, { Component } from 'react';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
   state = {
      ingredients: null,
      price: 0
   }

   checkoutCancelHandler = () => {
      this.props.history.goBack();
   }

   checkoutContinueHandler = () => {
      this.props.history.push(this.props.match.path + '/contact-data');
   }

   componentWillMount() {
      const query = new URLSearchParams(this.props.location.search);
      const ingredients = {};
      let price = 0;
      for (const param of query.entries()) {
         if (param[0] === 'price') {
            price = +param[1];
         } else {
            ingredients[param[0]] = +param[1];
         }
      }

      this.setState({ ingredients: ingredients, price: price })
   }

   render() {
      return (
         <div>
            <CheckoutSummary
               checkoutContinue={this.checkoutContinueHandler}
               checkoutCancel={this.checkoutCancelHandler}
               ingredients={this.props.ings} />
            <Route path={this.props.match.path + '/contact-data'} component={ContactData}
            />
         </div>
      );
   }
};

const mapStateToProps = state => {
   return {
       ings: state.ingredients,
   }
}

export default connect(mapStateToProps)(Checkout);