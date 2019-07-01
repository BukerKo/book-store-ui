import * as React from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {deleteUsers, getUsers, updateMainUserInformation} from "../util/APIUtils";
import '../styles/ManageUsers.css'
import {number} from "prop-types";
import {withRouter} from "react-router";

interface IProps {
    history: any,
    location: any,
    match: any
}

interface IState {
    data: any,
    options: Object,
    cellEditProps: Object,
    selectRowProp: Object,
    totalCount: number,
    sizePerPage: number,
    page: number
}

class ManageUsers extends React.Component<IProps, IState> {

    state = {
        data: Array(),
        options: Object(),
        cellEditProps: Object(),
        selectRowProp: Object(),
        totalCount: 0,
        sizePerPage: 10,
        page: 0
    };

    componentWillMount(): void {
        this.getData({
            page: 0,
            size: 10
        });
        this.setState({
            sizePerPage: 10,
            page: 0,
            selectRowProp: {
                mode: 'checkbox'
            },
            options: {
                onPageChange: this.onPageChange,
                afterDeleteRow: this.onAfterDeleteRow
            },
            cellEditProps: {
                mode: 'click',
                blurToSave: true,
                afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
            }
        });
    }

    onAfterSaveCell = (row: any, cellName: String, cellValue: String) => {
        updateMainUserInformation({
            id: row.id,
            username: row.username,
            email: row.email,
            gender: row.gender,
            role: row.role
        }).then();
    };

    onAfterDeleteRow = (rowKeys: any) => {
        deleteUsers(rowKeys).then(response => {
            this.getData({
                page: 0,
                size: this.state.sizePerPage
            });
        });
    };

    onPageChange = (page: number, sizePerPage: number) => {
        this.getData({
            page: page - 1,
            size: sizePerPage
        })

    };

    getData = (getUsersRequest: any) => {
        getUsers(getUsersRequest).then(
            response => {
                let data = new Array(response.totalCount);
                data.fill({});
                const currentPage = Number(getUsersRequest.page);
                const sizePerPage = Number(getUsersRequest.size);
                let start = currentPage * sizePerPage;
                for (let i = start; i < start + response.mainUserInformationList.length; i++) {
                    data[i] = response.mainUserInformationList[i - start];
                }
                this.setState({
                    data: data,
                    totalCount: response.totalCount,
                    page: getUsersRequest.page - 1,
                    sizePerPage: getUsersRequest.size
                });
            })
    };

    render() {
        let genders = ['Male', 'Female'];
        let roles = ['ROLE_USER', 'ROLE_ADMIN'];
        return (
            <div className='w-50 manage-users'>
                <BootstrapTable
                    ref='table'
                    data={this.state.data}
                    options={this.state.options}
                    cellEdit={this.state.cellEditProps}
                    selectRow={this.state.selectRowProp}
                    deleteRow={true}
                    pagination>
                    <TableHeaderColumn headerAlign='center' dataSort width='200' dataField='id'
                                       hidden={true} isKey={true}>Id</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' dataSort width='200'
                                       dataField='username'>Username</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' width='200' dataSort
                                       dataField='role'
                                       editable={{type: 'select', options: {values: roles}}}>Role</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' dataSort
                                       dataField='gender'
                                       editable={{
                                           type: 'select',
                                           options: {values: genders}
                                       }}>Gender</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' dataSort width='200'
                                       dataField='email'>Email</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default withRouter(ManageUsers);
