import * as React from "react";
import '../styles/User.css'
import LeftMenu from "./LeftMenu";
import Deck from "./Deck";
import {getVisibleBooks, getVisibleBooksCount} from "../util/APIUtils";
import {ACCESS_TOKEN, CARDS_ON_PAGE_SIZE, CURRENT_ROLE, USER_ROLE} from "../constants";
import {Redirect, Route, withRouter} from "react-router";
import Profile from "./Profile";
import Orders from "./Orders";


interface IProps {
    handleAddToCart: Function,
    isAuthenticated: Boolean,
    currentUser: any,
    history: any,
    location: any,
    match: any
}

interface IState {
    page: number,
    size: number,
    books: Array<any>
    totalBooks: number
}

class User extends React.Component<IProps, IState> {
    state = {
        page: 0,
        size: CARDS_ON_PAGE_SIZE,
        books: [],
        totalBooks: 0
    };

    componentDidMount(): void {
        this.getBooks();
    }

    getBooks = () => {
        getVisibleBooks({
            page: this.state.page,
            size: this.state.size
        }).then((response) => {
            let books = response["_embedded"].books;
            books.forEach((el:any) => {
                delete el["_links"];
            });
            this.setState({
                books: books
            });
        });
        getVisibleBooksCount()
            .then(response => {
                this.countPages(response);
            });

    };

    handleChangePage = (page: number) => {
        this.setState({page: page}, () => {
            this.getBooks();
        });
    };

    countPages = (visibleBooksCount: number) => {
        let pageCount = visibleBooksCount / CARDS_ON_PAGE_SIZE;
        const remainder = visibleBooksCount % CARDS_ON_PAGE_SIZE;
        if (remainder != 0) {
            pageCount = Math.floor(pageCount) + 1;
        }
        this.setState({totalBooks: pageCount});
    };

    handleMenuClick = (option: string) => {
        switch (option) {
            case 'Profile':
                this.props.history.push("/user/profile");
                break;
            case 'Books':
                this.props.history.push("/user");
                break;
            case 'Orders':
                this.props.history.push("/user/orders");
        }
    };

    getMenuItems = () => {
        return ['Profile', 'Books', 'Orders'];
    };


    render() {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return <Redirect to="/"/>
        }
        if (localStorage.getItem(CURRENT_ROLE) !== USER_ROLE) {
            return <Redirect to="/admin"/>
        }
        return (
            <div id={"user"} className="d-flex">
                <LeftMenu handleClick={this.handleMenuClick} listItems={this.getMenuItems()}/>
                <div id="user-body">
                    <Route exact path={this.props.match.path} render={() => <Deck books={this.state.books}
                                                                                  pagesCount={this.state.totalBooks}
                                                                                  handlePageClick={this.handleChangePage}
                                                                                  handleAddToCart={this.props.handleAddToCart}/>}/>
                    <Route exact path={`${this.props.match.path}/orders`} component={Orders}/>
                    <Route exact path={`${this.props.match.path}/profile`} component={Profile}/>
                </div>
            </div>
        );
    }
}

export default withRouter(User);

