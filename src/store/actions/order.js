import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCAHSE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};


export const purcahseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCAHSE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData)=> {
  return dispatch => {
      purchaseBurgerStart();
      setTimeout(() => {
          dispatch(purchaseBurgerSuccess({}))
      },1000)
  }
};
export const fetchOrderSuccess = (orders) =>{
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrderStart = (orders) =>{
    return {
        type: actionTypes.FETCH_ORDERS_START,
        orders: orders
    }
};

export const fetchOrders = () => {
    return dispatch => {
        setTimeout(()=>{
            const orders = [
                {id:1, ingredients:{salad: 1}, price: 4},
                {id:2, ingredient:{salad: 3}, price: 6}];
            dispatch(fetchOrderSuccess(orders));
        },2000)
    }
};