import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {USER_ROLE} from "../constants";
import {Dropdown, DropdownButton} from "react-bootstrap";
import "../styles/AppHeader.css"

interface IState {
    booksInCart: Array<any>
}

interface IProps {
    isAuthenticated: Boolean,
    currentUser: any,
    handleLogout: Function,
    handleConfirmOrder: Function
}

export default class AppHeader extends React.Component<IProps, IState> {
    state = {
        booksInCart:[]
    };

    clearCart = () => {
        this.setState({booksInCart: []});
    }

    addBookToCart = (book:any) => {
        this.setState({ booksInCart: [...this.state.booksInCart, book]});
    };

    handleLogout = () => {
        this.props.handleLogout();
    };

    handleConfirmOrder = () => {
        this.props.handleConfirmOrder(this.state.booksInCart);
        this.setState({booksInCart: []});
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
            </div>
        }

        return (
            <div className={'app-header'}>
                <Navbar bg="light" expand="lg" className="justify-content-between">
                    <Navbar.Text>
                        Hello, {this.props.currentUser.username}
                    </Navbar.Text>
                    {this.props.currentUser.role === USER_ROLE &&
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
