import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const initIngredients = () => {
  return dispatch => {
      setTimeout(()=> {
          const ings = {
                  salad: 1,
                  bacon: 1,
                  cheese: 2,
                  meat: 1,
              };
          dispatch(setIngredients(ings));
      },2000)
  };
};