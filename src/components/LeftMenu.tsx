import * as React from "react";
import {ListGroup, Navbar} from "react-bootstrap";
import '../styles/LeftMenu.css'
import {SyntheticEvent} from "react";

interface IProps {
    listItems: Array<string>,
    handleClick: Function
}

interface IState {

}

export default class LeftMenu extends React.Component<IProps, IState> {

    handleClick = (ev: SyntheticEvent) => {
        ev.preventDefault();
        this.props.handleClick(ev.currentTarget.innerHTML);
    };

    render() {

        const listItems = this.props.listItems.map((item) =>
            <ListGroup.Item className="text-center" key={item} action onClick={this.handleClick}>
                {item}
            </ListGroup.Item>
        );

        return (
            <Navbar className="navbar-fixed-left flex-column float-left">
                <ListGroup variant='flush' className="border">
                    {listItems}
                </ListGroup>
            </Navbar>
        );
    }
};
