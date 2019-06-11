import * as React from "react";
import {Button, Form} from "react-bootstrap";
import "../styles/Register.css"
import {Redirect} from "react-router";

export default class Register extends React.Component {

    state = {
        validated: false,
        toUser: false
    };

    handleSubmit = (event: any) => {
        console.log(event);
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({validated: true, toUser: true});
        console.log(this.state);
    };

    handleChange = (event: any) => {

    };


    render() {
        if (this.state.toUser) {
            return <Redirect to={"/user"} push/>
        }

        const {validated} = this.state;
        return (
            <div className="Register">
                <h1>Register</h1>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={this.handleSubmit}
                >
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Username" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBirthDate">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="birth" placeholder="Birthday" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select">
                            <option>Male</option>
                            <option>Female</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        );
    }
}
