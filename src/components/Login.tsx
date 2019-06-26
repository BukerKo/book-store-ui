import * as React from "react";
import {Component} from "react";
import {Button, Form} from "react-bootstrap";
import '../styles/Login.css'
import {Link} from "react-router-dom";
import {login} from "../util/APIUtils";
import {ACCESS_TOKEN, CURRENT_ROLE} from "../constants";

interface IProps {
    handleLogin: Function,
}

interface IState {
    usernameOrEmail?: String,
    password?: String,
    validated: Boolean
}

export default class Login extends Component<IProps, IState> {

    state = {
        usernameOrEmail: "",
        password: "",
        validated: false
    };

    handleChange = (event: any) => {
        let target = event.currentTarget;
        this.setState((current) => ({...current, [target.id]: target.value}))
    };

    handleSubmit = (event: React.FormEvent) => {
        event.stopPropagation();
        event.preventDefault();
        const {usernameOrEmail, password} = this.state;

        login({usernameOrEmail: usernameOrEmail, password: password})
            .then(response => {
                console.log(response);
                this.props.handleLogin(response);
            }).catch(error => {
            if (error.status === 401) {
                alert('Your Username or Password is incorrect. Please try again!');
            } else {
                alert(error.message || 'Sorry! Something went wrong. Please try again!')
            }
        });
    };

    render() {
        const {validated} = this.state;
        return (
            <div className="Login">
                <h1>Login</h1>
                <Form validated={validated} onSubmit={this.handleSubmit} autoComplete='off'>
                    <Form.Group controlId="usernameOrEmail">
                        <Form.Label>Enter email address or username</Form.Label>
                        <Form.Control type="usernameOrEmail" placeholder="Username/Email" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
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

