import * as React from "react"

import { Grid } from '@mui/material';

import Table from "../custom/Table";
import Button from '../custom/AddButton'

import Utils from "../../utils/TableUtils";

import { connect } from "react-redux";
import { getUserTable } from "../../redux/actions/users";

import { Order } from '../../types/order'
import { Navigate } from "react-router-dom";

const AdminPage: React.FC<any> = (props) => {

    
    const columns = Utils.getUserColumns()

    React.useEffect(() => {
        props.getUserTable()
    }, [])

    if (!props.isAdmin) {
        return <Navigate to="/home" replace />;
    }
    return (
        <React.Suspense fallback={<div>Cargando...</div>}>
            <Grid container direction="column" spacing={3}>
                <Grid container item spacing={3}>
                    <Grid item xs>
                        <Button text="Nuevo Usuario" href={'/admin/users'}/>
                    </Grid>
                </Grid>
                <Grid item xs>
                    <Table 
                        data={props.table_data}
                        page={props.page}
                        size={props.size}
                        total={props.total}
                        columns={columns} 
                        showColumns={true}
                        onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
                            props.getUserTable(page, size, filters, sort, sortDirection);
                        }}
                        onRowClick={(id: number) => {
                            window.open("/admin/users/" + id, "_self");
                        }}
                    />
                </Grid>
            </Grid>
        </React.Suspense>
    )
}

function mapStateToProps(state: any) {
	return {
		table_data: state.table_reducer.table_data,
		page: state.table_reducer.page,
		size: state.table_reducer.size,
		total: state.table_reducer.total
	};
}

const mapDispatchToProps = {
	getUserTable
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminPage);