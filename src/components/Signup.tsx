import * as React from "react";
import {Button, Form} from "react-bootstrap";
import "../styles/Register.css"
import {Redirect} from "react-router";
import {signup} from "../util/APIUtils";

import {withRouter} from 'react-router-dom';
import {DATE_REGEXP, EMAIL_REGEXP, PASSWORD_REGEXP, USERNAMEOREMAIL_REGEXP} from "../constants";

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
    toUser: boolean,
    validUsername: boolean
    validPassword: boolean,
    validRepeatPassword: boolean,
    validBirthday: boolean,
    validEmail: boolean,
    validated: boolean
}


class Signup extends React.Component<IProps, IState> {

    state = {
        username: '',
        password: '',
        repeatPassword: '',
        birthday: '',
        email: '',
        gender: 'Male',
        toUser: false,
        validPassword: false,
        validRepeatPassword: false,
        validBirthday: false,
        validEmail: false,
        validated: false,
        validUsername: false
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

    validate = (target: any) => {
        let isValid: boolean;
        switch (target.id) {
            case "username" :
                isValid = new RegExp(USERNAMEOREMAIL_REGEXP).test(target.value);
                this.setState(prevState => {
                    return {
                        validUsername: isValid,
                        validated: prevState.validPassword && prevState.validRepeatPassword && prevState.validBirthday
                            && prevState.validEmail && isValid
                    }});
                break;
            case "password":
                isValid = new RegExp(PASSWORD_REGEXP).test(target.value);
                this.setState(prevState => {
                    return {
                        validPassword: isValid,
                        validated: prevState.validUsername && prevState.validRepeatPassword && prevState.validBirthday
                            && prevState.validEmail && isValid
                    }});
                break;
            case "repeatPassword":
                isValid = new RegExp(PASSWORD_REGEXP).test(target.value) && target.value === this.state.password;
                this.setState(prevState => {
                    return {
                        validRepeatPassword: isValid,
                        validated: prevState.validUsername && prevState.validPassword && prevState.validBirthday
                            && prevState.validEmail && isValid
                    }});
                break;
            case "birthday":
                isValid = new RegExp(DATE_REGEXP).test(target.value);
                this.setState(prevState => {
                    return {
                        validBirthday: isValid,
                        validated: prevState.validUsername && prevState.validRepeatPassword && prevState.validPassword
                            && prevState.validEmail && isValid
                    }});
                break;
            case "email":
                isValid = new RegExp(EMAIL_REGEXP).test(target.value);
                this.setState(prevState => {
                    return {
                        validEmail: isValid,
                        validated: prevState.validUsername && prevState.validRepeatPassword && prevState.validBirthday
                            && prevState.validPassword && isValid
                    }});
                break;
        }
    };

    handleChange = (event: any) => {
        const target = event.target;
        this.validate(target);
        this.setState((current) => ({...current, [target.id]: target.value}))
    };


    render() {
        if (this.state.toUser) {
            return <Redirect to={"/user"} push/>
        }
        const {validated, validBirthday, validEmail, validPassword, validRepeatPassword, validUsername} = this.state;
        return (
            <div className="Register">
                <h1>Sign up</h1>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={this.handleSubmit}
                    autoComplete='off'>
                    <Form.Group controlId="username">
                        <Form.Label column={false}>Username</Form.Label>
                        <Form.Control type="username" placeholder="Username" onChange={this.handleChange}
                        isValid={validUsername} isInvalid={!validUsername}/>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label column={false}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange}
                        isValid={validPassword} isInvalid={!validPassword}/>
                    </Form.Group>

                    <Form.Group controlId="repeatPassword">
                        <Form.Label column={false}>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange}
                        isValid={validRepeatPassword} isInvalid={!validRepeatPassword}/>
                    </Form.Group>

                    <Form.Group controlId="birthday">
                        <Form.Label column={false}>Birthday</Form.Label>
                        <Form.Control type="birth" placeholder="Eg: 20-04-1980" onChange={this.handleChange}
                        isValid={validBirthday} isInvalid={!validBirthday}/>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label column={false}>Email</Form.Label>
                        <Form.Control type="email" placeholder="example@email.com" onChange={this.handleChange}
                        isValid={validEmail} isInvalid={!validEmail}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label column={false}>Gender</Form.Label>
                        <Form.Control as="select" id="gender" onChange={this.handleChange}>
                            <option>Male</option>
                            <option>Female</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={!validated}>
                        Sign up
                    </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(Signup);
