import React, {Component} from 'react';
import AppHeader from "./components/AppHeader";
import {Route, Switch} from "react-router";
import User from "./components/User";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {addOrder, getCurrentUser} from "./util/APIUtils";

import {withRouter} from 'react-router-dom';
import Admin from "./components/Admin";
import {ACCESS_TOKEN, BOOKS_IN_CART, CURRENT_ROLE, CURRENT_USERNAME} from "./constants";


interface IProps {
  history: any,
  location: any,
  match: any
}

interface IState {
  isAuthenticated: Boolean,
  currentUser: any,
  booksInCart: Array<any>
}

class App extends Component<IProps, IState> {
  headerElement: React.RefObject<AppHeader> = React.createRef();

  state = {
    isAuthenticated: false,
    currentUser: {
      accessToken: '',
      role: '',
      username: ''
    },
    booksInCart: []
  };


  handleLogout = () => {
    localStorage.clear();

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push("/");
  };

  loadCurrentUser = () => {
    return getCurrentUser()
        .then(response => {
          localStorage.setItem(CURRENT_USERNAME, response.username);
          this.setState({
            currentUser: response,
            isAuthenticated: true,
          });
        })
  };

  handleLogin = (response: any) => {
    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
    localStorage.setItem(CURRENT_ROLE, response.role);
    this.loadCurrentUser()
        .then(() => {
          if (this.state.currentUser.role.includes('ROLE_ADMIN')) {
            this.props.history.push('/admin/books');
          } else {
            this.props.history.push('/user');
          }
        });
  };

  handleAddToCart = (book: any) => {
    if (!this.headerElement.current) {
      return;
    }
    let booksInCart = JSON.parse(localStorage.getItem(BOOKS_IN_CART) || '[]');
    booksInCart.push(book);
    localStorage.setItem(BOOKS_IN_CART, JSON.stringify(booksInCart));
    this.headerElement.current.loadCartFromLocalStorage();
  };

  groupBooksById = (books: Array<any>) => {
    let booksInOrder = books.reduce((p, c) => {
      let id = c.id;
      if (!p.hasOwnProperty(id)) {
        p[id] = 0;
      }
      p[id]++;
      return p;
    }, {});

    return Object.keys(booksInOrder).map(k => {
      return {id: k, count: booksInOrder[k]};
    });

  };

  handleConfirmOrder = (books: Array<any>) => {
    const totalPrice = books.reduce((total, current) => total + parseInt(current.price), 0);

    let request = {
      books: this.groupBooksById(books),
      totalPrice: totalPrice
    };

    addOrder(request)
        .then(() => {
          if (this.headerElement.current) {
            this.headerElement.current.clearCart()
          }
        });
  };

  handleCancelOrder = () => {
    this.props.history.push("/user");
  };

  render() {

    return (
        <div className={"app-container"}>
          {localStorage.getItem(ACCESS_TOKEN) &&
          <AppHeader ref={this.headerElement}
                     isAuthenticated={this.state.isAuthenticated}
                     currentUser={this.state.currentUser}
                     handleLogout={this.handleLogout}
                     handleConfirmOrder={this.handleConfirmOrder}
                     handleCancelOrder={this.handleCancelOrder}/>}
          <Switch>

            <Route path={"/user"}
                   component={(props: any) => <User isAuthenticated={this.state.isAuthenticated}
                                                    currentUser={this.state.currentUser}
                                                    handleAddToCart={this.handleAddToCart}
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
