import * as React from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import {withRouter} from "react-router";
import '../styles/NewBook.css'
import {addBook, uploadImage} from "../util/APIUtils";
import FileInput from "./FileInput";

interface IProps {
    history: any,
    location: any,
    match: any
}

interface IState {
    title: String,
    quantity: Number,
    price: Number,
    visible: String,
    photo: any,
    validated: boolean,
    validTitle: boolean,
    validPrice: boolean,
    validQuantity: boolean,
    validPhoto: boolean
}

class NewBook extends React.Component<IProps, IState> {

    state = {
        title: '',
        quantity: 1,
        price: 10,
        visible: 'off',
        photo: null,
        validated: false,
        validTitle: false,
        validPrice: false,
        validQuantity: false,
        validPhoto: false
    };

    handleFileInput = (image: any) => {
        this.setState({photo: image});
    };

    handleChange = (event: any) => {
        const target = event.target;
        this.setState((current) => ({...current, [target.id]: target.value}));
    };

    handleSubmit = (event: any) => {
        event.preventDefault();
        uploadImage(this.state.photo).then(
            response => addBook({
                title: this.state.title,
                quantity: this.state.quantity,
                price: this.state.price,
                visible: this.state.visible === 'on',
                photo: response.fileDownloadUri
            })
                .then(this.props.history.push("/admin/books"))
        );
    };


    render() {
        const {validated, validPhoto, validPrice, validQuantity, validTitle} = this.state;
        return (
            <div className="changeProfile w-100">
                <Form onSubmit={this.handleSubmit}
                      autoComplete='off'
                      noValidate
                      validated={validated}
                    >
                    <Form.Label className='text-center book-label' column={true}>Book</Form.Label>

                    <Form.Group controlId="title">
                        <Form.Label column={false}>Title</Form.Label>
                        <Form.Control type="text" onChange={this.handleChange}
                        isValid={validTitle} isInvalid={!validTitle}/>
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label column={false}>Price</Form.Label>
                        <Form.Control type="text" onChange={this.handleChange}
                        isValid={validPrice} isInvalid={!validPrice}/>
                    </Form.Group>

                    <Form.Group controlId="quantity">
                        <Form.Label column={false}>Count</Form.Label>
                        <Form.Control type="text" onChange={this.handleChange} value={this.state.quantity.toString(2)}
                        isValid={validQuantity} isInvalid={!validQuantity}/>
                    </Form.Group>

                    <Form.Group controlId="photo">
                        <Form.Label column={false}>Photo</Form.Label>
                        <FileInput handleFileChoose={this.handleFileInput}/>
                    </Form.Group>

                    <Form.Group controlId="visible">
                        <Form.Label column={false}>Visible</Form.Label>
                        <Form.Check type="checkbox" onChange={this.handleChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={!validated}>
                        Save
                    </Button>
                </Form>
            </div>
        )
    };

}

export default withRouter(NewBook);
