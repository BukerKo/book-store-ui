import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {BOOKS_IN_CART, CURRENT_ROLE, CURRENT_USERNAME, USER_ROLE} from "../constants";
import {Dropdown, DropdownButton} from "react-bootstrap";
import "../styles/AppHeader.css"

interface IState {
    booksInCart: Array<any>
}

interface IProps {
    isAuthenticated: Boolean,
    currentUser: any,
    handleLogout: Function,
    handleConfirmOrder: Function,
    handleCancelOrder: Function
}

export default class AppHeader extends React.Component<IProps, IState> {
    state = {
        booksInCart:[]
    };

    componentDidMount(): void {
        this.loadCartFromLocalStorage();
    }

    clearCart = () => {
        localStorage.setItem(BOOKS_IN_CART, "[]");
        this.loadCartFromLocalStorage();
    };

    loadCartFromLocalStorage = () => {
        this.setState({ booksInCart: JSON.parse(localStorage.getItem(BOOKS_IN_CART) || '[]')});
    };

    handleLogout = () => {
        this.props.handleLogout();
    };

    handleConfirmOrder = () => {
        this.props.handleConfirmOrder(this.state.booksInCart);
        this.setState({booksInCart: []});
    };

    handleCancelOrder = () => {
        localStorage.setItem(BOOKS_IN_CART, "[]");
        this.props.handleCancelOrder();
        this.loadCartFromLocalStorage();
    };

    render() {
        let dropdownItems: any[] = [];
        this.state.booksInCart.forEach((book:any, index) => {
            dropdownItems.push(<Dropdown.Header key={index}>{book.title}</Dropdown.Header>);
        });

        let dropDownContent;
        if (this.state.booksInCart.length == 0) {
            dropDownContent = <Dropdown.Header>Nothing to show</Dropdown.Header>;
        } else {
            dropDownContent = <div id="dropdown-content">
                {dropdownItems}
                <Dropdown.Divider/>
                <Dropdown.Item onClick={this.handleConfirmOrder}>Confirm</Dropdown.Item>
                <Dropdown.Item onClick={this.handleCancelOrder}>Cancel</Dropdown.Item>
            </div>
        }

        return (
            <div className='app-header'>
                <Navbar bg="light" expand="lg" className="justify-content-between">
                    <Navbar.Text>
                        Hello, {localStorage.getItem(CURRENT_USERNAME)}
                    </Navbar.Text>
                    {localStorage.getItem(CURRENT_ROLE) === USER_ROLE &&
                    <DropdownButton id="dropdown-basic-button" title="Order">
                        {dropDownContent}
                    </DropdownButton>}
                    <Button onClick={this.handleLogout}>
                        Logout
                    </Button>
                </Navbar>
            </div>
        );
    }
}
