import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
   state = {
      ingredients: {
         salad: 1,
         meat: 1,
         cheese: 1,
         bacon: 1
      }
   }

   checkoutCancelHandler = () => {
      this.props.history.goBack();
   }

   checkoutContinueHandler = () => {
      this.props.history.push('/checkout/contact-data');
   }

   componentDidMount() {
      const query = new URLSearchParams(this.props.location.search);
      const ingredients = {};
      for(const param of query.entries()){
         ingredients[param[0]] = +param[1]
      }

      this.setState({ingredients: ingredients})
   }

   render() {
      return (
         <div>
            <CheckoutSummary
               checkoutContinue={this.checkoutContinueHandler}
               checkoutCancel={this.checkoutCancelHandler}
               ingredients={this.state.ingredients} />
         </div>
      );
   }
};

export default Checkout;