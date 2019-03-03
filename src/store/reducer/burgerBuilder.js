import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState = {
    ingredients: {},
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon: 0.7
};

const addIngredients = (state, action) => {
    const upatedIngredients = {[action.ingredientName]:state.ingredients};
    const updatedIngredients = updateObject(state.ingredients, upatedIngredients);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedState);
};
const burgerBuilder = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS: return addIngredients(state, action);
        case actionTypes.REMOVE_INGREDIENTS:
            const upatedIng = {[action.ingredientName]:state.ingredients};
            const updatedIngs = updateObject(state.ingredients, upatedIng);
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedSt);
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.ingredients
            };
        default:
            return state;
    }
};

export default burgerBuilder;