import * as React from "react";
import {Button, Form} from "react-bootstrap";
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
}

class NewBook extends React.Component<IProps, IState> {

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
        return (
            <div className="changeProfile w-100">
                <Form onSubmit={this.handleSubmit} autoComplete='off'>
                    <Form.Label className='text-center book-label' column={true}>Book</Form.Label>

                    <Form.Group controlId="title">
                        <Form.Label column={false}>Title</Form.Label>
                        <Form.Control type="text" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label column={false}>Price</Form.Label>
                        <Form.Control type="text" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="quantity">
                        <Form.Label column={false}>Count</Form.Label>
                        <Form.Control type="text" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="photo">
                        <Form.Label column={false}>Photo</Form.Label>
                        {/*<Form.Control type="photo" onChange={this.handleChange}/>*/}
                        <FileInput handleFileChoose={this.handleFileInput}/>
                    </Form.Group>

                    <Form.Group controlId="visible">
                        <Form.Label column={false}>Visible</Form.Label>
                        <Form.Check type="checkbox" onChange={this.handleChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </div>
        )
    };

}

export default withRouter(NewBook);
