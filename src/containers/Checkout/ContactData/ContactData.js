import React, { Component } from 'react';
import { connect } from 'react-redux';


import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-order';
import * as actions from '../../../store/actions/index';
class ContactData extends Component{
    state= {
        orderForm:{
            name: {
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false
            },
            postal:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false
            }
        }
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderDate: {}
        };

        this.props.onOrderBurger(order);
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = ContactData.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm:updatedOrderForm});
    };

    static checkValidity (value, rules) {
        let isValid = false;
        if(rules.required) {
            isValid = value.trim() !== '';
        }
        return isValid;
    }

    render(){
        const formElementArray= [];
        for(let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(
                    formElement => (<Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            changed={(event)=>this.inputChangedHandler(event, formElement.id)} />
                        )
                )}

                <Button btnType="Success"
                        clicked={this.orderHandler}>Order</Button>
            </form>
        );
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToState = dispatch => {
    return {
        onOrderBurger: (orderDate) => dispatch(actions.purchaseBurger(orderDate))
    }
};

export default connect(mapStateToProps, mapDispatchToState)(withErrorHandler(ContactData, axios));