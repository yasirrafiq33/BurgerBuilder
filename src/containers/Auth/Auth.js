import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spiner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
class Auth extends Component{
    state = {
        controls:{
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false
            },
        },
        isSignup: true
    };
    checkValidity (value, rules) {
        let isValid = false;
        if(rules.required) {
            isValid = value.trim() !== '';
        }
        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation)
            }
        };
        this.setState({controls: updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value, this.state.isSignup);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    };

    render() {
        const formElementArray= [];
        for(let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementArray.map(formElement =>(
          <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              changed={(event)=>this.inputChangeHandler(event, formElement.id)}
          />
        ));
        if(this.props.loading){
            form = <Spinner />
        }

        let redirect = null;
        if(this.props.isAuthenticated){
            redirect = <Redirect to="/orders"/>
        }
        return (
            <div className={classes.Auth}>
                {redirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">Switch To {this.state.isSignup? 'SignIn': "SignUp"}</Button>
            </div>
        );
    }

}

const mapStateToProps = state=> {
    return{
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null
    }
};
const mapDispatchToProps = dispatch=> {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);