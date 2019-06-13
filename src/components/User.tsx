import * as React from "react";
import {Redirect} from "react-router";
import Row from "react-bootstrap/Row";
import {Col, Container, ListGroup, Navbar} from "react-bootstrap";
import '../styles/User.css'


interface IProps {
    isAuthenticated: Boolean,
    currentUser: any,
}

interface IState {
}

export default class User extends React.Component<IProps, IState>{

    handleClick = () => {
      console.log('nice');
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
                <Container>
                    <Row>
                        <Col>
                            <Navbar className="navbar-fixed-left flex-column">
                                <ListGroup variant='flush' className="border">
                                    <ListGroup.Item action onClick={this.handleClick}>
                                        This one is a button
                                    </ListGroup.Item>
                                    <ListGroup.Item action onClick={this.handleClick}>
                                        This one is a button
                                    </ListGroup.Item>
                                </ListGroup>
                            </Navbar>
                        </Col>
                        <Col md={8}>
                            <h1>AAAAA</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
