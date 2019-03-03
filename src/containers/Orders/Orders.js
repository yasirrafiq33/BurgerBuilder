import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';
class Orders extends Component{
    componentDidMount() {
        this.props.onFetchOrders();
    }
    render(){
        return (
            <div>
                {this.props.orders.map(order => (
                    <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>
                ))}
                <Order/>
                <Order/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);