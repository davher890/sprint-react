import React from "react"

import { connect } from "react-redux";

import { Grid } from '@material-ui/core';

import Card from '../../components/custom/Card';
import Table from '../../components/custom/Table';
import Select from '../../components/custom/Select'

import { getReturnedReceiptTable } from "../../redux/actions/receipts";

import Utils from "../../utils/TableUtils"

import { Order } from '../../types/order'


const ReturnedReceiptTable: React.FC<any> = (props) => {

    const [ season, setSeason ] = React.useState<string>()

    React.useEffect(() => {
		props.getReturnedReceiptTable();
	}, [ ])

    return (
        <>
            <Grid container direction="column" spacing={1}>
                {/* <Grid item xs>
                    <Card title="Datos de la remesa">
                        <Grid item xs>
                            <Select fullWidth name="season" label="Temporada" error={!season}
                                options={[
                                    { id: "2021_2022", name: "2021 - 2022" },
                                    { id: "2022_2023", name: "2022 - 2023" },
                                    { id: "2023_2024", name: "2023 - 2024" },
                                ]} value={season}
                                onChange={(e: any, value: any) => {
                                    setSeason(value ? value.id : "")
                                }}
                            />
                        </Grid>
                    </Card>
                </Grid> */}
                <Grid item xs>
                    <Table 
                        data={props.table_data}
                        page={props.page}
                        size={props.size}
                        total={props.total}
                        columns={ Utils.getReceiptAthleteColumns('', {}) }
                        onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
                            props.getReturnedReceiptTable(page, size, filters, sort, sortDirection);
                        }}
                        onRowClick={(id: number) => {
                            window.open("/receipts/athletes/" + id, "_self");
                        }}
                    />
                </Grid>


            </Grid>
        </>
                
    )
}


const mapDispatchToProps = {
    getReturnedReceiptTable
}

const mapStateToProps = (state: any) => {
    return { 
        table_data: state.table_reducer.table_data,
		page: state.table_reducer.page,
		size: state.table_reducer.size,
		total: state.table_reducer.total
    };
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ReturnedReceiptTable);
