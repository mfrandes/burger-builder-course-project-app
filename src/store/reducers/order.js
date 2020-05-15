import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false
};

const reducer = (state = initialState, ation) => {
    switch (ation.type) {
        case actionTypes.PURCHASE_BURGER_SUCCES:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

export default reducer;