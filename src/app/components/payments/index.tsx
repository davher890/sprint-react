import React, { useState } from "react"

import moment, { Moment } from 'moment'
import { Grid, AppBar, Toolbar, Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';

import Table from "../custom/Table";
import TextField from '../custom/TextField';
import SearchButton from '../custom/SearchButton'

import { connect } from "react-redux";

import { getPaymentAthleteTable, downloadPaymentAthletes } from "../../redux/actions/athletes";

import SportSchoolSelect from "../custom/SportSchoolSelect";

import Utils from "../../utils/TableUtils"

const NewPaymentForm: React.FC<any> = (props) => {

    const [sportSchoolId, setSportSchoolId] = useState<number>(0)
    const [fromDate, setFromDate] = useState<number>(0)
    const [toDate, setToDate] = useState<number>(0)
    const [concept, setConcept] = useState<string>("")

    const [successMessage, setSuccessMessage] = useState<string>("")

    const getFilters = () => {
        const filter: any = {
            lastRegisterDate : {
                filterVal: fromDate ? fromDate + "__" + toDate : toDate,
                comparator: fromDate ? 'between' : 'lte'
            }
        }
        if (sportSchoolId > 0){
            filter['sportSchoolId'] = {
                filterVal: sportSchoolId.toString(),
                comparator: '='
            }

        }
        return filter;

    }
    const handleSubmitQuery = () => {
        if (toDate){
            let filter = getFilters()
            props.getPaymentAthleteTable(0, 10, filter, "id", "asc");
        }
    }

    const downloadData = (columns: any, filters: any) => {
        if (toDate){
            let filter = getFilters()
            props.downloadPaymentAthletes(columns, {...filters, ...filter}, concept)
            setSuccessMessage("El fichero es demasiado grande, se enviara a su correo.")
        }
    }

    return (
        <React.Suspense fallback={<div>Cargando...</div>}>
            <Snackbar open={successMessage !== undefined && successMessage !== ''}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
                <Alert severity="success" onClose={() => { 
                        setSuccessMessage(""); 
                    }}>
                    <AlertTitle>Ok!</AlertTitle>
                    <strong>{successMessage}</strong>
                </Alert>
            </Snackbar>

            <Grid container direction="column">
                <Grid container item direction='row' spacing={3}>
                    <Grid item xs>
                        <SportSchoolSelect sportSchoolId={sportSchoolId}
                            onChange={(id: number) => {
                                setSportSchoolId(id);
                            }}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField value={fromDate}
                            label="Incorporados desde" type="date"
                            InputProps={{inputProps: { min: "1940-01-01", max: moment(new Date()).format("YYYY-MM-DD")} }}
                            onChange={(e: any) => {
                                setFromDate(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField value={toDate}
                            error={!toDate}
                            label="Incorporados hasta" type="date"
                            InputProps={{inputProps: { min: "1940-01-01", max: moment(new Date()).format("YYYY-MM-DD")} }}
                            onChange={(e: any) => {
                                setToDate(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField name="concept" label="Concepto" value={concept} margin="dense" 
                            onChange={(e: any) => {
                                setConcept(e.target.value);
                            }} />
                    </Grid>
                    
                </Grid>
                <Grid container item>
                    <Grid item xs>
                        <Table 
                            data={props.table_data}
                            page={props.page}
                            size={props.size}
                            total={props.total}
                            columns={Utils.getPaymentColumns()} 
                            downloadData={downloadData}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                <Toolbar>
                    <SearchButton type="submit" onClick={handleSubmitQuery}>Buscar</SearchButton>
                </Toolbar>
            </AppBar>  
        </React.Suspense>
    );

}

const mapDispatchToProps =  {
    getPaymentAthleteTable, downloadPaymentAthletes
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
    mapStateToProps, mapDispatchToProps
)(NewPaymentForm);