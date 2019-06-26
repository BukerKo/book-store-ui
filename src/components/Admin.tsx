import * as React from "react";
import {Redirect, Route, withRouter} from "react-router";
import {ACCESS_TOKEN, CURRENT_ROLE, USER_ROLE} from "../constants";
import LeftMenu from "./LeftMenu";
import Deck from "./Deck";
import Orders from "./Orders";
import Profile from "./Profile";
import ManageBooks from "./ManageBooks";
import ManageUsers from "./ManageUsers";
import NewBook from "./NewBook";

interface IProps {
    isAuthenticated: Boolean,
    currentUser: any,
    history: any,
    location: any,
    match: any
}

interface IState {
}

class Admin extends React.Component<IProps, IState> {


    handleMenuClick = (option: string) => {
        switch (option) {
            case 'Profile':
                this.props.history.push("/admin/profile");
                break;
            case 'Users':
                this.props.history.push("/admin/users");
                break;
            case 'Books':
                this.props.history.push("/admin/books");
        }
    };

    getMenuItems = () => {
        return ['Profile', 'Users', 'Books'];
    };

    render() {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return <Redirect to="/"/>
        }
        if (localStorage.getItem(CURRENT_ROLE) === USER_ROLE) {
            return <Redirect to="/user"/>
        }
        return (
            <div id={"admin"} className="d-flex">
                <LeftMenu handleClick={this.handleMenuClick} listItems={this.getMenuItems()}/>
                <div id="user-body">
                    <Route exact path={`${this.props.match.path}/users`} component={ManageUsers}/>
                    <Route exact path={`${this.props.match.path}/books`} component={ManageBooks}/>
                    <Route exact path={`${this.props.match.path}/profile`} component={Profile}/>
                    <Route exact path={`${this.props.match.path}/newBook`} component={NewBook}/>
                </div>
            </div>
        );
    };

}

export default withRouter(Admin);
