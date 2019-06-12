import * as React from "react";

interface IProps {
    isAuthenticated: Boolean,
    currentUser: String,
}

interface IState {
}

export default class User extends React.Component<IProps, IState>{

    render() {
        return (
            <div id={"user"}>
                <h1>User</h1>
            </div>
        );
    }
}
