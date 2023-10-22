import React from "react"

import { connect } from "react-redux";

import { Box, Grid, Tabs, Tab, Table, TableBody, TableHead, TableRow, TableCell, TableContainer } from '@material-ui/core';
import { withTheme, makeStyles } from '@material-ui/core/styles';

import Card from '../../components/custom/Card';
import Select from '../../components/custom/Select'

import Utils from "../../utils/TableUtils";

import { getReturnReceiptRegistered, getReturnReceiptUnregistered } from "../../redux/actions/receipts";

const ReturnedReceiptTable: React.FC<any> = (props) => {

    const styles = makeStyles({
		root: {
			"& .MuiTableCell-head": {
				color: props.theme.palette.secondary.main,
				backgroundColor: props.theme.palette.primary.main
			},
			'& .MuiFormLabel-root.Mui-disabled': {
				color: 'red',
			},
			"& .MuiFormLabel-root": {
				color: props.theme.palette.secondary.main,
			},
			"& .MuiFormLabel-root.Mui-focused": {
				color: props.theme.palette.secondary.main,
			},
			"& .MuiInputBase-input.MuiInput-input": {
				color: props.theme.palette.secondary.main,
			}
		},
		sortLabelIcon: {
			color: props.theme.palette.secondary.main,
			// fontSize: 30,
			opacity: 1
		}
	});

	const classes = styles();

    const [ season, setSeason ] = React.useState<string>()
    const [ tabIndex, setTabIndex] = React.useState(0);

    const handleTabChange = (event: any, newValue: number) => {
      setTabIndex(newValue);
    };

    const getTableHead = (columns: any[]) => {
		return <TableHead className={classes.root}>
			<TableRow>
				{columns.map((column) => (
					<TableCell style={{ minWidth: '250px' }} key={column.dataField}>
						{ <strong>{column.text}</strong> }
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	}

    const getRowData = (row: any, columns: any[]) => {

		let rowId = row.id
		let columnNames : string[] = columns.map((c: any) => c.dataField)
		return columnNames.map(column => (
			<TableCell key={ rowId + "_" + column } onClick={() => window.open("/receipts/athletes/" + rowId, "_self")}>
				{row[column]}
			</TableCell>
		))
	}

    const getTable = (data: any, columns: any[]) => {
        return (
            <TableContainer>
                <Table stickyHeader size="small">
                    { getTableHead(columns) }
                    <TableBody>
                    {
                        data.map((row:any) => (
                            <TableRow hover key={row.id}>
                                { getRowData(row, columns) }
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    React.useEffect(() => {
		if (season){
            props.getReturnReceiptRegistered(season);
            props.getReturnReceiptUnregistered(season);
        }
	}, [ season ])

    return (
        <>
            <Grid container direction="column" spacing={1}>
                <Grid item xs>
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
                    
                    { tabIndex === 0 && props.receipt_registered_athlete && props.receipt_registered_athlete.length > 0 && <Box width="100%" overflow="auto">
						{ getTable(props.receipt_registered_athlete, Utils.getReturnedReceiptColumns('', '').filter((d:any) => d.show === undefined || d.show === true)) }
                    </Box>
                    }
                    { tabIndex === 1 && props.receipt_unregistered_athlete && props.receipt_unregistered_athlete.length > 0 && <Box width="100%" overflow="auto">
						{ getTable(props.receipt_unregistered_athlete, Utils.getReturnedReceiptColumns('', '').filter((d:any) => d.show === undefined || d.show === true)) }
                    </Box>
                    }
                </Grid>


            </Grid>
        </>
                
    )
}


const mapDispatchToProps = {
    getReturnReceiptRegistered, 
    getReturnReceiptUnregistered
}

const mapStateToProps = (state: any) => {
    return { 
        receipt_registered_athlete: state.receipt_reducer.receipt_registered_athlete,
        receipt_unregistered_athlete: state.receipt_reducer.receipt_unregistered_athlete
    };
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(withTheme(ReturnedReceiptTable));
