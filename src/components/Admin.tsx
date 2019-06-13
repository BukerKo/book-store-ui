import * as React from "react";
import {Redirect} from "react-router";

interface IProps {
    isAuthenticated: Boolean,
    currentUser: any,
}

interface IState {
}

export default class Admin extends React.Component<IProps, IState> {

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/"/>
        }
        if (this.props.currentUser.role !== 'ROLE_ADMIN') {
            return <Redirect to="/user"/>
        }
        return (
            <div><h1>Admin</h1></div>
        );
    };

}
