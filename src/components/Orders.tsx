import * as React from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {getOrders} from "../util/APIUtils";
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../styles/Orders.css'


export default class Orders extends React.Component {
    state = {
        data: Array(),
        options: Object()
    };

    componentWillMount(): void {
        this.getData({
            page: 0,
            size: 10
        });
        this.setState({
            options: {
                onPageChange: this.onPageChange,
            }
        });
    }

    onPageChange = (page: number, sizePerPage: number) => {
        this.getData({
            page: page - 1,
            size: sizePerPage
        })
    };

    getData = (getOrdersRequest: any) => {
        let i = 1;
        getOrders(getOrdersRequest).then(
            response => {
                response.forEach((item: any) => {
                    item.id = i;
                    i++;
                    item.bookTitleToCounts = item.bookTitleToCounts.map((value: any) => {
                        return '' + value.title + " (" + value.count + ")";
                    });
                    item.bookTitleToCounts = item.bookTitleToCounts.reduce((prev: any, current: any) => {
                        return '' + prev + ", " + current;
                    });
                });
                this.setState({data: response});
            })
    };


    render() {
        return (
            <div className='w-50 order'>
                <BootstrapTable
                    ref='table'
                    data={this.state.data}
                    options={this.state.options}
                    pagination>
                    <TableHeaderColumn headerAlign='center' dataSort width='50' dataField='id'
                                       isKey={true}>ID</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' dataSort
                                       dataField='bookTitleToCounts'>Books</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' dataSort width='100'
                                       dataField='price'>Price</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' dataSort width='150'
                                       dataField='date'>Date</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    };
}
