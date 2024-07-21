import React from "react"

import { connect } from "react-redux";

import { Box, Grid, Tabs, Tab } from '@mui/material';

import Table from "../../components/custom/Table";
import Card from '../../components/custom/Card';
import Select from '../../components/custom/Select'

import { Order } from '../../types/order'

import Utils from "../../utils/TableUtils";

import { getReturnReceiptRegisteredAthleteTable, getReturnReceiptUnregisteredAthleteTable, downloadReturnReceiptRegisteredAthlete, downloadReturnReceiptUnregisteredAthlete } from "../../redux/actions/receipts";

const ReturnedReceiptTable: React.FC<any> = (props) => {

    const [ season, setSeason ] = React.useState<string>()
    const [ tabIndex, setTabIndex ] = React.useState<number>(0);

    const handleTabChange = (event: any, newValue: number) => {
        setTabIndex(newValue);
    };

    const downloadData = (columns: any, filters: any) => {
        if (tabIndex === 0){
            props.downloadReturnReceiptRegisteredAthlete(season, columns, filters)
        }
        else {
		    props.downloadReturnReceiptUnregisteredAthlete(season, columns, filters)
        }
	}

    React.useEffect(() => {
		if (season){
            if (tabIndex === 0){
                props.getReturnReceiptRegisteredAthleteTable(season);
            }

            if (tabIndex === 1){
                props.getReturnReceiptUnregisteredAthleteTable(season);
            }
            setSeason(season)
        }
	}, [ season, tabIndex ])

    return (
        <>
            <Grid container direction="column" spacing={1}>
                <Grid item xs>
                    <Card title="Datos de la remesa">
                        <Grid item xs>
                            <Select fullWidth name="season" label="Temporada" //error={!season}
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
                </Grid>
                <Grid item xs>
                    <Tabs
                        value={tabIndex}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleTabChange}
                    >
                        <Tab label="Gestion" />
                        <Tab label="Historico" />
                    </Tabs>
                    
                    <Box width="100%" overflow="auto">
                        <Table 
                            data={props.table_data}
                            page={props.page}
                            size={props.size}
                            total={props.total}
                            columns={Utils.getReturnedReceiptColumns('', '')} 
                            downloadData={downloadData}
						    showColumns={false}
                            onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
                                if (tabIndex === 0){
                                    props.getReturnReceiptRegisteredAthleteTable(season, page, size, filters, sort, sortDirection);
                                }
                                if (tabIndex === 1){
                                    props.getReturnReceiptUnregisteredAthleteTable(season, page, size, filters, sort, sortDirection);
                                }
                            }}
                            onRowClick={(id: number) => {
                                window.open("/receipts/athletes/" + id, "_self");
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
                
    )
}


const mapDispatchToProps = {
    getReturnReceiptRegisteredAthleteTable, 
    getReturnReceiptUnregisteredAthleteTable,
    downloadReturnReceiptRegisteredAthlete, 
    downloadReturnReceiptUnregisteredAthlete
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
