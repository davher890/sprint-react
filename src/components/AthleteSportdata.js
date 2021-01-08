import React, { Component } from "react";

import { DataGrid } from '@material-ui/data-grid'

class AthleteSportdata extends Component {

	constructor(props) {
        super(props)

        this.state = {
        	columns : [
        		{ field: 'id', hide: true },
        		{ field: 'Temporada' },
        		{ field: 'Entrenador' },
        		{ field: 'Categoría' },
        		{ field: 'Actitud' },
        		{ field: 'Implicación' },
        		{ field: 'Nivel técnico' },
        		{ field: 'Motivaciones', resizable: false },
        		{ field: 'Resultados destacados' },
        		{ field: 'Lesions' }
    		]
        }
    }

    render() {
    
        return (
        	<div>
				<DataGrid
					columns={this.state.columns}
					rows={[
						{
							id: 1,
							username: 'defunkt',
							age: 38,
						},
					]}
				/>
        	</div>
    	)
    }
}

export default AthleteSportdata;
