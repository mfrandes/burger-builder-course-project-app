import React, { Component } from 'react';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
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

   render() {
      let summary = <Redirect to="/" />
      if (this.props.ings) {
         const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
         summary = (
            <div>
               {purchasedRedirect}
               <CheckoutSummary
                  checkoutContinue={this.checkoutContinueHandler}
                  checkoutCancel={this.checkoutCancelHandler}
                  ingredients={this.props.ings} />
               <Route path={this.props.match.path + '/contact-data'} component={ContactData}
               />
            </div>
         );
      }
      return summary;

   }
};

const mapStateToProps = state => {
   return {
      ings: state.burgerBuilder.ingredients,
      purchased: state.order.purchased
   }
}

export default connect(mapStateToProps)(Checkout);