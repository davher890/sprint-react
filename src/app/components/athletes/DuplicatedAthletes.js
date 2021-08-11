import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';

import Table from "../custom/Table";

import Utils from "../../utils/TableUtils";
import { connect } from "react-redux";

import { getDuplicatedAthletesTable } from "../../redux/actions/athletes";

class DuplicatedAthletes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            name: this.props.name,
        	firstSurname : this.props.firstSurname,
            dni: this.props.dni
        }
    }

    componentDidMount() {
        if (this.props && this.props.id && this.props.name && this.props.firstSurname && this.props.dni) {
            this.props.getDuplicatedAthletesTable(this.props.id, this.props.name, this.props.firstSurname, this.props.dni);
        }
	}

    onRowClick(id, row){
        window.open("/athletes/" + id, "_self");
    }

    render() {
        return (
        	<Grid container direction="column">
                <Grid item xs>
                    <Table
                        data={this.props.table_data}
                        page={this.props.page}
                        size={this.props.size}
                        total={this.props.total}
                        columns={Utils.getAthleteColumns()} 
                        showColumns={false}
                        onRowClick={this.onRowClick}
                    >
                    </Table>
                </Grid>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
	return {
		table_data: state.table_reducer.table_data,
		page: state.table_reducer.page,
		size: state.table_reducer.size,
		total: state.table_reducer.total
	};
}

const mapDispatchToProps = {
    getDuplicatedAthletesTable
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DuplicatedAthletes);