import * as React from "react";
import {Component} from "react";
import {Button, Form} from "react-bootstrap";
import '../styles/Login.css'
import {Link} from "react-router-dom";
import {login} from "../util/APIUtils";

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

    handleChange = (event: any) => {
        let target = event.currentTarget;

        event.stopPropagation();
            event.preventDefault();
        this.setState({
            validated: true,
            validPassword: true,
            validUsernameOrEmail: true
        });
        // let regex = new RegExp("^[a-zA-Z0-9_.@-]+$");
        // if (!regex.test(target.value)) {
        //     event.stopPropagation();
        //     event.preventDefault();
        //     if (target.id === 'email') {
        //         this.setState({validUsernameOrEmail: false})
        //     } else {
        //         this.setState({validPassword: false})
        //     }
        //     this.setState({validated: false});
        //     return;
        // }

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
        return (
            <div className="Login">
                <h1>Login</h1>
                <Form onSubmit={this.handleSubmit} autoComplete='off'>
                    <Form.Group controlId="usernameOrEmail">
                        <Form.Label column={false}>Enter email address or username</Form.Label>
                        <Form.Control
                                      type="usernameOrEmail" placeholder="Username/Email" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label column={false}>Password</Form.Label>
                        <Form.Control
                                      type="password" placeholder="Password" onChange={this.handleChange}/>
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

