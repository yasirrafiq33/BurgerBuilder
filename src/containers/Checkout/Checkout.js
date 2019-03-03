import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component{
    state= {
        ingredients:{
            salad:1,meat:1,cheese:1,bacon:1
        }
    };

    componentWillMount() {
       const query = new URLSearchParams(this.props.location.search);
       const ingredients = {};
       for(let param of query.entries()){
           ingredients[param[0]] = +param[1];
       }
       this.setState({ingredients: ingredients});
    }

    checkoutCancelHandler = ()=> {
        this.props.history.goBack();
    };

    checkoutContinueHandler = ()=> {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return(
            <div>
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelHandler}
                    checkoutContinued={this.checkoutContinueHandler}
                    ingredients={this.state.ingredients}/>
                <Route
                    path={this.props.match.path +'/contact-data'}
                    render={() =>(<ContactData ingredients={this.state.ingredients} />)}/>
            </div>
        )
    }
}

export default Checkout;