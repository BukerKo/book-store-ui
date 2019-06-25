import * as React from "react";

import CardDeck from 'react-bootstrap/CardDeck'
import {Button, Card, Pagination} from "react-bootstrap";
import "../styles/Deck.css"

interface IProps {
    books: Array<any>
    pagesCount: number,
    handlePageClick: Function,
    handleAddToCart: Function
}

interface IState {
    activePage: number,
    books: Array<any>
}


export default class Deck extends React.Component<IProps, IState> {
    state = {
        activePage: 1,
        books: new Array()
    };

    componentWillReceiveProps(nextProps: Readonly<IProps>, nextContext: any): void {
        this.setState({books: nextProps.books});
    }

    handlePageClick = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();
        let page = ev.currentTarget.innerHTML;
        this.props.handlePageClick(page - 1);
        this.setState({activePage: page})
    };

    handleAddToCart = (ev:any) => {
        ev.preventDefault();
        ev.stopPropagation();
        const idToSearch = ev.currentTarget.value;
        let book = {};
        this.state.books.forEach((element:any, index:number) => {
            if(element.id == idToSearch) {
                book = element;
                let books = this.state.books;
                books[index].quantity = books[index].quantity - 1;
                this.setState({books: books});
                return;
            }
        });
        this.props.handleAddToCart(book);
    };

    render() {
        const cards = this.state.books.map((book) =>
            <div>
                <Card key={book.id} className="card">
                    <Card.Header as="h5" className="text-center">{book.title}</Card.Header>
                    <Card.Img variant="top" src={book.photo}/>
                    {book.quantity == 0 ?
                        <Card.Footer className="text-center">
                            Absent
                        </Card.Footer> :
                        <Card.Footer className="text-center">
                            {book.price}$
                            <Button className="float-right" onClick={this.handleAddToCart} value={book.id}>
                                +
                            </Button>
                        </Card.Footer>}
                </Card>
            </div>
        );

        let items = [];
        for (let number = 1; number <= this.props.pagesCount; number++) {
            items.push(
                <Pagination.Item key={number} active={number === this.state.activePage} onClick={this.handlePageClick}>
                    {number}
                </Pagination.Item>,
            );
        }

        return (
            <div id="card-deck-container">
                <CardDeck className="w-100 d-flex flex-wrap justify-content-around">
                    {cards}
                </CardDeck>
                {this.props.pagesCount > 1 &&
                    <Pagination className="justify-content-center">
                        <Pagination.Prev/>
                        {items}
                        <Pagination.Next/>
                    </Pagination>
                }
            </div>
        );
    }

}
