import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
   state = {
      ingeredients: {
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

   render() {
      return (
         <div>
            <CheckoutSummary
               checkoutContinue={this.checkoutContinueHandler}
               checkoutCancel={this.checkoutCancelHandler}
               ingredients={this.state.ingeredients} />
         </div>
      );
   }
};

export default Checkout;