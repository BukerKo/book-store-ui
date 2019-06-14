import * as React from "react";
import '../styles/User.css'
import LeftMenu from "./LeftMenu";
import Deck from "./Deck";
import {getBooks} from "../util/APIUtils";
import {CARDS_ON_PAGE_SIZE} from "../constants";
import {Route, withRouter} from "react-router";
import Profile from "./Profile";
import Orders from "./Orders";


interface IProps {
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
}

class User extends React.Component<IProps, IState> {
    state = {
        page: 0,
        size: CARDS_ON_PAGE_SIZE,
        books: []
    };

    componentDidMount(): void {
        getBooks({
            page: this.state.page,
            size: this.state.size
        }).then((response) => {
            this.setState({
                books: response["_embedded"].books
            });
        });
    }

    handleChangePage = (page: number) => {

        this.setState({page: page});
    };

    handleClick = (ev:MouseEvent) => {
        this.props.history.push("/user/profile");
    };

    getItems = () => {
        return ['Profile', 'Orders'];
    };

    getCards = () => {
        return this.state.books;
    };


    render() {
        // if (!this.props.isAuthenticated) {
        //     return <Redirect to="/"/>
        // }
        // if (this.props.currentUser.role !== 'ROLE_USER') {
        //     return <Redirect to="/admin"/>
        // }
        return (
            <div id={"user"}>
                <LeftMenu handleClick={this.handleClick} listItems={this.getItems()}/>

                <Route exact path={this.props.match.path} render={() => <Deck cards={this.getCards()}/>} />
                <Route exact path={`${this.props.match.path}/orders`} component={Orders} />
                <Route exact path={`${this.props.match.path}/profile`} component={Profile} />
            </div>
        );
    }
}

export default withRouter(User);

