import * as React from "react";
import {Button, Form} from "react-bootstrap";
import "../styles/Register.css"
import {Redirect} from "react-router";
import {signup} from "../util/APIUtils";

import {withRouter} from 'react-router-dom';

interface IProps {
    history: any,
    location: any,
    match: any
}

interface IState {
    username: String,
    password: String,
    repeatPassword: String,
    birthday: String,
    email: String,
    gender: String,
    validated: Boolean,
    toUser: Boolean
}


class Signup extends React.Component<IProps, IState> {

    state = {
        username: '',
        password: '',
        repeatPassword: '',
        birthday: '',
        email: '',
        gender: 'Male',
        validated: false,
        toUser: false
    };

    handleSubmit = (event: any) => {
        event.preventDefault();
        const signupRequest = {
            username: this.state.username,
            password: this.state.password,
            birthday: this.state.birthday,
            email: this.state.email,
            gender: this.state.gender
        };

        signup(signupRequest)
            .then(response => {
                this.props.history.push('/user');
            }).catch(error => {
            alert(error.message || 'Sorry! Something went wrong. Please try again!');
        });
    };

    handleChange = (event: any) => {
        const target = event.target;
        this.setState((current) => ({...current, [target.id]: target.value}))
    };


    render() {
        if (this.state.toUser) {
            return <Redirect to={"/user"} push/>
        }
        const {validated} = this.state;
        return (
            <div className="Register">
                <h1>Sign up</h1>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={this.handleSubmit}
                    autoComplete='off'
                >
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Username" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="repeatPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="birthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="birth" placeholder="Birthday" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" id="gender" onChange={this.handleChange}>
                            <option>Male</option>
                            <option>Female</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Sign up
                    </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(Signup);
