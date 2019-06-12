import React, {Component} from 'react';
import AppHeader from "./components/AppHeader";
import {Route, Switch} from "react-router";
import User from "./components/User";
import Login from "./components/Login";
import Signup from "./components/Signup";


export default class App extends Component {

  state = {
    isAuthenticated: false,
    currentUser: '',
  };

  handleSubmit = (credentials: Object) => {
    this.setState({toUser: true});
  };

  handleLogout = () => {

  };

  handleLogin = (credentials:Object) => {
    console.log(credentials);
  };

  render() {
    // if (this.state.toUser) {
    //   return <Redirect to={"/user"} push/>
    // }

    return (
        <div className={"app-container"}>
          <AppHeader isAuthenticated={this.state.isAuthenticated}
                     currentUser={this.state.currentUser}
                     handleLogout={this.handleLogout}/>
          <Switch>
            <Route exact path={"/user"}
                   render={(props) => <User isAuthenticated={this.state.isAuthenticated}
                                            currentUser={this.state.currentUser}
                                            {...props}/>}/>

            <Route path="/" exact
                   render={(props) => <Login handleLogin={this.handleLogin} {...props}/>}/>
            <Route path="/signup" exact component={Signup}/>
          </Switch>
        </div>
    );
  }

}
