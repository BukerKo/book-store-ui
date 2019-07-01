import * as React from "react";
import {Component} from "react";
import {Button, Form} from "react-bootstrap";
import '../styles/Login.css'
import {Link} from "react-router-dom";
import {login} from "../util/APIUtils";
import {PASSWORD_REGEXP, USERNAMEOREMAIL_REGEXP} from "../constants";

interface IProps {
    handleLogin: Function,
}

interface IState {
    usernameOrEmail?: String,
    password?: String,
    validated: Boolean,
    validUsernameOrEmail: Boolean,
    validPassword: Boolean
}

export default class Login extends Component<IProps, IState> {

    state = {
        usernameOrEmail: "",
        password: "",
        validated: false,
        validUsernameOrEmail: false,
        validPassword: false
    };

    validate = (target: any) => {
        let isValid: boolean;
        switch (target.id) {
            case "usernameOrEmail":
                isValid = new RegExp(USERNAMEOREMAIL_REGEXP).test(target.value);
                this.setState(prevState => {
                return {
                    validUsernameOrEmail: isValid,
                    validated: prevState.validPassword && isValid
                }});
                break;
            case "password":
                isValid = new RegExp(PASSWORD_REGEXP).test(target.value);
                this.setState(prevState => {
                    return {
                        validPassword: isValid,
                        validated: prevState.validUsernameOrEmail && isValid
                    }});
                break;
        }
    };

    handleChange = (event: any) => {
        let target = event.currentTarget;

        event.stopPropagation();
        event.preventDefault();
        this.validate(target);

        this.setState((current) => ({...current, [target.id]: target.value}))
    };

    handleSubmit = (event: React.FormEvent) => {
        event.stopPropagation();
        event.preventDefault();
        const {usernameOrEmail, password} = this.state;

        if (this.state.validated) {
            login({usernameOrEmail: usernameOrEmail, password: password})
                .then(response => {
                    this.props.handleLogin(response);
                }).catch(error => {
                if (error.status === 401) {
                    alert('Your Username or Password is incorrect. Please try again!');
                } else {
                    alert(error.message || 'Sorry! Something went wrong. Please try again!')
                }
            });
        }
    };

    render() {
        let {validPassword, validUsernameOrEmail} = this.state;
        return (
            <div className="Login">
                <h1>Login</h1>
                <Form onSubmit={this.handleSubmit} autoComplete='off' noValidate>
                    <Form.Group controlId="usernameOrEmail">
                        <Form.Label column={false}>Enter email address or username</Form.Label>
                        <Form.Control
                            type="usernameOrEmail" placeholder="Username/Email" onChange={this.handleChange}
                            isValid={validUsernameOrEmail}
                            isInvalid={!validUsernameOrEmail}/>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label column={false}>Password</Form.Label>
                        <Form.Control
                            type="password" placeholder="Password" onChange={this.handleChange}
                            isValid={validPassword}
                            isInvalid={!validPassword}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={!this.state.validated}>
                        Login
                    </Button>

                    <Link to={"/signup"}>
                        <Button id={'register'} variant="secondary" type="button">
                            Sign up
                        </Button>
                    </Link>
                </Form>
            </div>
        );
    }
}

