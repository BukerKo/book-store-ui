import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

interface IState {

}

interface IProps {
    isAuthenticated: Boolean,
    currentUser: any,
    handleLogout: Function
}

export default class AppHeader extends React.Component<IProps, IState> {

    handleClick = () => {
        this.props.handleLogout();
    };

    render() {
        if (!this.props.isAuthenticated) {
            return null;
        }
        return (
            <div className={'app-header'}>
                <Navbar bg="light" expand="lg" className="justify-content-between">
                    <Navbar.Text >
                        Hello, {this.props.currentUser.username}
                    </Navbar.Text>
                    <Button onClick={this.handleClick}>
                        Logout
                    </Button>
                </Navbar>
            </div>
        );
    }
}
