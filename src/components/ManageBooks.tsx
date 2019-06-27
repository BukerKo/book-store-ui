import * as React from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import '../styles/ManageBooks.css'
import {getBooks, updateBook} from "../util/APIUtils";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";


export default class ManageBooks extends React.Component {

    state = {
        data: Array(),
        options: Object(),
        cellEditProps: Object(),
    };

    componentWillMount(): void {
        this.getData({
            page: 0,
            size: 10
        });
        this.setState({
            options: {
                onPageChange: this.onPageChange,
            },
            cellEditProps: {
                mode: 'click',
                blurToSave: true,
                afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
            }
        });
    }

    onAfterSaveCell = (row: any, cellName: String, cellValue: String) => {
        let rowStr = '';
        for (const prop in row) {
            rowStr += prop + ': ' + row[prop] + '\n';
        }

        updateBook({
            id: row['id'],
            title: row['title'],
            quantity: row['quantity'],
            price: row['price'],
            visible: row['visible'] === 'Yes',
            photo: row['photo']
        }).then();

    };

    onPageChange = (page: number, sizePerPage: number) => {
        this.getData({
            page: page - 1,
            size: sizePerPage
        })
    };

    getData = (getBooksRequest: any) => {
        getBooks(getBooksRequest).then(
            response => {
                response['_embedded'].books.forEach((item: any) => {
                    item.visible = item.visible ? 'Yes' : 'No';
                });
                this.setState({data: response['_embedded'].books});
            })
    };

    render() {
        return (
            <div className='manage-books-container'>
                <Link to="/admin/newBook" className='float-right'>
                    <Button>
                        New Book
                    </Button>
                </Link>
                <div className='w-75 manage-books'>
                    <BootstrapTable
                        ref='table'
                        data={this.state.data}
                        options={this.state.options}
                        cellEdit={this.state.cellEditProps}
                        pagination>
                        <TableHeaderColumn headerAlign='center' dataSort width='200' dataField='title'
                                           isKey={true}>Name</TableHeaderColumn>
                        <TableHeaderColumn headerAlign='center' width='100' dataSort
                                           dataField='price'>Price</TableHeaderColumn>
                        <TableHeaderColumn headerAlign='center' dataSort
                                           dataField='photo'>Photo</TableHeaderColumn>
                        <TableHeaderColumn headerAlign='center' dataSort width='100'
                                           dataField='quantity'>Count</TableHeaderColumn>
                        <TableHeaderColumn headerAlign='center' dataSort width='100'
                                           dataField='visible' editable={{type: 'checkbox',options: {values: 'Yes:No'}}}>Visible</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        );
    }

}
