import React, {Component} from 'react';
import Login from "./components/Login";
import {Redirect} from "react-router-dom";


export default class App extends Component {

  state = {
    toRegister: false,
    toUser: false
  };

  handleSubmit = (credentials: Object) => {
    this.setState({toUser: true});
  };

  handleRegister = () => {
    this.setState({toRegister: true});
  };

  render() {
    console.log(this.state);
    if (this.state.toUser) {
      return <Redirect to={"/user"} push/>
    }
    if (this.state.toRegister) {
      return <Redirect to={"/register"} push/>
    }
    return <Login handleSubmit={this.handleSubmit} handleRegister={this.handleRegister}/>

  }

}
