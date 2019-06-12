import * as React from "react";
import {Component} from "react";
import {Button, Form} from "react-bootstrap";
import '../styles/Login.css'
import {Link} from "react-router-dom";

interface IProps {
    handleLogin: Function,
}

interface IState {
    email?: String,
    password?: String,
    validated: Boolean
}

export default class Login extends Component<IProps, IState> {

    state = {
        email: "",
        password: "",
        validated: false
    };

    handleChange = (event: any) => {
        let target = event.currentTarget;
        this.setState((current) => ({...current, [target.type]: target.value}))
    };

    handleSubmit = (event: React.FormEvent) => {
        const {email, password} = this.state;

        event.preventDefault();
        event.stopPropagation();
        this.setState({validated: true},
            () => this.props.handleLogin({email: email, password: password})
        );
    };

    render() {
        const {validated} = this.state;
        return (
            <div className="Login">
                <h1>Login</h1>
                <Form validated={validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>

                    <Link to={"/signup"}>
                        <Button id={'register'} variant="secondary" type="button" >
                            Sign up
                        </Button>
                    </Link>
                </Form>
            </div>
        );
    }
}

