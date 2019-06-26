import * as React from "react";
import {Button, Form} from "react-bootstrap";
import "../styles/Profile.css"
import {getCurrentUser, updateUser} from "../util/APIUtils";
import {withRouter} from "react-router";

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
}

class Profile extends React.Component<IProps, IState> {
    state = {
        username: '',
        password: '',
        repeatPassword: '',
        birthday: '',
        email: '',
        gender: 'Male',
    };


    handleChange = (event: any) => {
        const target = event.target;
        this.setState((current) => ({...current, [target.id]: target.value}))
    };

    handleSubmit = () => {
        getCurrentUser().then(response => this.setState({username: response.username}, this.sendUserUpdateCall));
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
        return (
            <div className="changeProfile w-100">
                <Form onSubmit={this.handleSubmit}
                autoComplete='off'>
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

                    <Form.Group>
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" id="gender" onChange={this.handleChange}>
                            <option>Male</option>
                            <option>Female</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </div>
        )
    };
}

export default withRouter(Profile);
