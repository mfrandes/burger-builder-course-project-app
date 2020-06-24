import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const addIngredient = (state, action) => {
    const updatedIngredientAdd = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredientsAdd = updateObject(state.ingredients, updatedIngredientAdd);
    const updatedStateAdd = {
        ingredients: updatedIngredientsAdd,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedStateAdd);
}

const removeIngredient = (state, action) => {
    const updatedIngredientRem = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngredientsRem = updateObject(state.ingredients, updatedIngredientRem);
    const updatedStateRem = {
        ingredients: updatedIngredientsRem,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true

    }
    return updateObject(state, updatedStateRem);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error: false,
        totalPrice: 4,
        building: false

    });
};

const fetchIngredientsFail = (state, action) => {
    return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAIL: return fetchIngredientsFail(state, action);
        default: return state;
    }
};

export default reducer;