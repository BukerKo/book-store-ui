import * as React from "react";

import CardDeck from 'react-bootstrap/CardDeck'
import {Button, Card} from "react-bootstrap";

interface IProps {
    cards: Array<any>
}

interface IState {

}


export default class Deck extends React.Component<IProps, IState> {

    render() {

        const cards = this.props.cards.map((card) =>
            <Card key={card.title}>
                <Card.Header as="h5" className="text-center">{card.title}</Card.Header>
                <Card.Img variant="top" src={card.photo}/>
                {card.quantity == 0 ?
                    <Card.Footer className="text-center h-100">
                        Absent
                    </Card.Footer> :
                    <Card.Footer>
                        <Button className="float-right" >
                            +
                        </Button>
                    </Card.Footer>}
            </Card>
        );

        return (
            <CardDeck className="w-100">
                {cards}
            </CardDeck>
        );
    }

}
