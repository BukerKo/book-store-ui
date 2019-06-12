import * as React from "react";

interface IState {

}

interface IProps {
    isAuthenticated: Boolean,
    currentUser: String,
    handleLogout: Function
}

export default class AppHeader extends React.Component<IProps, IState>{


    render() {
        return (
            <div><h1></h1></div>
        );
    }
}
