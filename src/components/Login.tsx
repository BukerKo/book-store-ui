import * as React from "react";
import {Component} from "react";
import {Button, Form} from "react-bootstrap";
import '../styles/Login.css'

interface IProps {
    handleSubmit: Function,
    handleRegister: (event: React.MouseEvent) => void
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
        if (target.type === 'email') {
            this.setState((current) => ({...current, email: target.value}))
        } else {
            this.setState((current) => ({...current, password: target.value}))
        }
    };

    handleSubmit = (event: React.FormEvent) => {
        if (this.state.email && this.state.password) {

        }
        event.preventDefault();
        event.stopPropagation();
        this.setState({validated: true},
            () => this.props.handleSubmit({email: this.state.email, password: this.state.password})
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

                    <Button id={'register'} variant="secondary" type="button" onClick={this.props.handleRegister}>
                        Register
                    </Button>
                </Form>
            </div>
        );
    }
}

