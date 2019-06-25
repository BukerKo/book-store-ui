import * as React from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {getOrders} from "../util/APIUtils";
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../styles/Orders.css'



export default class Orders extends React.Component {
    state = {
        data: Array(),
    };

    componentWillMount(): void {
        this.getData();
    }

    getData = () => {
        let i = 1;
        getOrders().then(
            response => {

                this.setState({data: response}, () => {
                    this.state.data.forEach((item) => {
                        item.id = i;
                        i++;
                        item.bookTitleToCounts = item.bookTitleToCounts.map((value:any) => {
                            return '' + value.title + " (" + value.count + ")";
                        });
                        item.bookTitleToCounts = item.bookTitleToCounts.reduce((prev:any, current:any) => {
                            return '' + prev + ", " + current;
                        });
                    });
                });
            })
    };


    render() {
        return (
            <div className='w-50 order'>
                <BootstrapTable
                    ref='table'
                    data={this.state.data}
                    pagination>
                    <TableHeaderColumn headerAlign='center' dataSort width='50' dataField='id' isKey={true}>ID</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' dataSort dataField='bookTitleToCounts'>Books</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' dataSort width='100' dataField='price'>Price</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' dataSort width='150' dataField='date'>Date</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    };
}
