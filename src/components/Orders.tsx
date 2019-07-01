import * as React from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {getBookingsCount, getOrders} from "../util/APIUtils";
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../styles/Orders.css'
import {number} from "prop-types";


export default class Orders extends React.Component {
    state = {
        data: Array(),
        options: Object(),
        totalCount: number
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
        let totalCount: number;
        getBookingsCount().then(response => {
            totalCount = response;
            getOrders(getOrdersRequest).then(
                response => {
                    if (response.length == 0) {
                        return;
                    }
                    let data = new Array(totalCount);
                    data.fill({});
                    const currentPage = Number(getOrdersRequest.page);
                    const sizePerPage = Number(getOrdersRequest.size);
                    let start = currentPage * sizePerPage;
                    let i = start + 1;
                    response.forEach((item: any) => {
                        item.key = i;
                        i++;
                        item.bookTitleToCounts = item.bookTitleToCounts.map((value: any) => {
                            return '' + value.title + " (" + value.count + ")";
                        });
                        item.bookTitleToCounts = item.bookTitleToCounts.reduce((prev: any, current: any) => {
                            return '' + prev + ", " + current;
                        });
                    });
                    for (let i = start; i < start + response.length; i++) {
                        data[i] = response[i - start];
                    }
                    this.setState({
                        data: data,
                        totalCount: totalCount
                    });
                })
        });

    };


    render() {
        return (
            <div className='w-50 order'>
                <BootstrapTable
                    ref='table'
                    data={this.state.data}
                    options={this.state.options}
                    pagination>
                    <TableHeaderColumn headerAlign='center' dataSort width='50' dataField='key'
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
