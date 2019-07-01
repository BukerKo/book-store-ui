import * as React from "react";
import {Button, Form} from "react-bootstrap";
import "../styles/Profile.css"
import {getCurrentUser, updateUser} from "../util/APIUtils";
import {withRouter} from "react-router";
import {DATE_REGEXP, EMAIL_REGEXP, PASSWORD_REGEXP} from "../constants";

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
    validPassword: boolean,
    validRepeatPassword: boolean,
    validBirthday: boolean,
    validEmail: boolean,
    validated: boolean
}

class Profile extends React.Component<IProps, IState> {
    state = {
        username: '',
        password: '',
        repeatPassword: '',
        birthday: '',
        email: '',
        gender: 'Male',
        validPassword: false,
        validRepeatPassword: false,
        validBirthday: false,
        validEmail: false,
        validated: false
    };

    validate = (target: any) => {
        let isValid: boolean;
        switch (target.id) {
            case "password":
                isValid = new RegExp(PASSWORD_REGEXP).test(target.value);
                this.setState(prevState => {
                    return {
                        validPassword: isValid,
                        validated: prevState.validRepeatPassword && prevState.validBirthday && prevState.validEmail && isValid
                    }});
                break;
            case "repeatPassword":
                isValid = new RegExp(PASSWORD_REGEXP).test(target.value) && target.value === this.state.password;
                this.setState(prevState => {
                    return {
                        validRepeatPassword: isValid,
                        validated: prevState.validPassword && prevState.validBirthday && prevState.validEmail && isValid
                    }});
                break;
            case "birthday":
                isValid = new RegExp(DATE_REGEXP).test(target.value);
                this.setState(prevState => {
                    return {
                        validBirthday: isValid,
                        validated: prevState.validRepeatPassword && prevState.validPassword && prevState.validEmail && isValid
                    }});
                break;
            case "email":
                isValid = new RegExp(EMAIL_REGEXP).test(target.value);
                this.setState(prevState => {
                    return {
                        validEmail: isValid,
                        validated: prevState.validRepeatPassword && prevState.validBirthday && prevState.validPassword && isValid
                    }});
                break;
        }
    };


    handleChange = (event: any) => {
        const target = event.target;
        this.validate(target);
        this.setState((current) => ({...current, [target.id]: target.value}))
    };

    handleSubmit = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();
        if (this.state.validated) {
            getCurrentUser().then(response => this.setState({username: response.username}, this.sendUserUpdateCall));
        }
    };

    sendUserUpdateCall = () => {
        updateUser({
            "username": this.state.username,
            "password": this.state.password,
            "email": this.state.email,
            "userInformation": {
                "gender": this.state.gender,
                "birthday": this.state.birthday
            }
        }).then(this.props.history.push("/user/"));
    };

    render() {
        const {validBirthday, validEmail, validPassword, validRepeatPassword} = this.state;
        return (
            <div className="changeProfile w-100">
                <Form onSubmit={this.handleSubmit}
                      autoComplete='off'
                      noValidate>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange}
                                      isValid={validPassword} isInvalid={!validPassword}/>
                    </Form.Group>

                    <Form.Group controlId="repeatPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange}
                                      isValid={validRepeatPassword} isInvalid={!validRepeatPassword}/>
                    </Form.Group>

                    <Form.Group controlId="birthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="birth" placeholder="Eg: 20-04-1980" onChange={this.handleChange}
                                      isValid={validBirthday} isInvalid={!validBirthday}/>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="example@email.com" onChange={this.handleChange}
                                      isValid={validEmail} isInvalid={!validEmail}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" id="gender" onChange={this.handleChange}>
                            <option>Male</option>
                            <option>Female</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={!this.state.validated}>
                        Save
                    </Button>
                </Form>
            </div>
        )
    };
}

export default withRouter(Profile);
