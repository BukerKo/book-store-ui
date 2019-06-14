import React, {Component} from 'react';
import AppHeader from "./components/AppHeader";
import {Route, Switch} from "react-router";
import User from "./components/User";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {getCurrentUser} from "./util/APIUtils";

import {withRouter} from 'react-router-dom';
import Admin from "./components/Admin";
import {ACCESS_TOKEN} from "./constants";


interface IProps {
  history: any,
  location: any,
  match: any
}

interface IState {
  isAuthenticated: Boolean,
  currentUser: any,
}

class App extends Component<IProps, IState> {

  state = {
    isAuthenticated: false,
    currentUser: {
      accessToken: '',
      role: '',
      username: ''
    },
  };


  handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push("/");
  };

  loadCurrentUser = () => {
    return getCurrentUser()
        .then(response => {
          this.setState({
            currentUser: response,
            isAuthenticated: true,
          });
        })
  };

  handleLogin = () => {
    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    this.loadCurrentUser()
        .then(() => {
          if (this.state.currentUser.role.includes('ROLE_ADMIN')) {
            this.props.history.push('/admin');
          } else {
            this.props.history.push('/user');
          }
        });
  };

  render() {

    return (
        <div className={"app-container"}>
          {this.state.isAuthenticated &&
          <AppHeader isAuthenticated={this.state.isAuthenticated}
                     currentUser={this.state.currentUser}
                     handleLogout={this.handleLogout}/>}
          <Switch>

            <Route path={"/user"}
                   component={(props: any) => <User isAuthenticated={this.state.isAuthenticated}
                                                    currentUser={this.state.currentUser}
                                                    {...props}/>}/>

            <Route path="/" exact
                   render={(props) => <Login handleLogin={this.handleLogin} {...props}/>}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/admin" render={(props) => <Admin isAuthenticated={this.state.isAuthenticated}
                                                           currentUser={this.state.currentUser}
                                                           {...props}/>}/>
          </Switch>
        </div>
    );
  }

}

export default withRouter(App);
