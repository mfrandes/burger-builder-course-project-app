import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        errorMode: false
    }

    // componentDidMount() {
    //     axios.get('https://react-my-burger-6485d.firebaseio.com/ingredients.json')
    //         .then(response => {
    //             console.log(response);
    //             const ingredients = Object.keys(response.data);
    //             let totalPrice = this.state.totalPrice;
    //             ingredients.forEach(ingredient => {
    //                 const priceAddition = INGREDIENT_PRICES[ingredient];
    //                 const pricePerIng = response.data[ingredient] * priceAddition;
    //                 totalPrice = totalPrice + pricePerIng;
    //                 console.log(totalPrice);
    //             });
    //             this.setState({ ingredients: response.data, totalPrice: totalPrice });
    //             this.updatePurchaseState(response.data);
    //         })
    //         .catch(error => {
    //             this.setState({ errorMode: true });
    //         });
    // }

    updatePurchaseState(updatedIngredients) {
        const ingredients = {
            ...updatedIngredients
        };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    cancelPurchaseHandler = () => {
        if (this.state.loading) {
            return;
        };

        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push("/checkout");
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        let orderSummary = null;
        let burger = this.state.errorMode ? <p>Unable to load ingredients, App is broken!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngreedientsAdded}
                        ingredientRemoved={this.props.onIngreedientsRemoved}
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.cancelPurchaseHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngreedientsAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngreedientsRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));