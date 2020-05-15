import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const purchaseBurgerSucces = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCES,
        orderId: id,
        orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    };
};

export const purchaseBurgerStart = (orderData) => {
    return dispatchEvent => {
        Axios.post('/orders.json', order)
            .then(response => {
                dispatch(purchaseBurgerSucces(response.data, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}