import React, { Component } from "react";
import { Formik } from 'formik';

import MultiSelect from './MultiSelect'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { DataGrid } from '@material-ui/data-grid'

import Button from './Button'

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	columns : props.columns.map(c => {
        		c.field = c.dataField
        		c.headerName = c.text
        		return c
        	}),
        	entityName : props.entityName,
        	data : [],
        	urlParams : '',
        	size : 10,
        	page : 1,
        	total : 0,
        	showExcel : props.showExcel || false,
        	fixedFilters : props.filter ? props.filter.split(",") : [],
        	filters : []
    	}
    	this.fetchData = this.fetchData.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
        this.downloadData = this.downloadData.bind(this)
    }

   //  componentDidMount(prevProps, nextProps){
   //      if(prevProps !== this.props){
			// this.fetchData()
   //  	}
   //  }

 //    async componentDidUpdate(prevProps) {

 //    	if (this.props.entityName && this.props.entityName !== this.state.entityName){
 //    		await this.setState({
 //    			entityName : this.props.entityName
 //    		})
 //    		this.fetchData()
 //    	}
	// }

    fetchData(){
    	if (this.state.entityName && this.state.entityName !== ""){
			const headers = { 'Content-Type': 'application/json' }
			
			let url = process.env.REACT_APP_SERVER_URL + "/" + this.props.entityName + "?page=" + (this.state.page-1) + "&size=" + this.state.size
			let totalFilter = []

			if (this.state.filters && this.state.filters.length > 0){
				totalFilter.push(this.state.filters)
			}
			if (this.state.fixedFilters && this.state.fixedFilters.length > 0){
				totalFilter.push(this.state.fixedFilters)
			}
			if (totalFilter.length > 0){
				console.log(totalFilter)
				url = url + '&filters=' + totalFilter.reduce((accumulator, currentValue) => accumulator + ',' + currentValue)
			}
			fetch(url,  { headers })
				.then(response => response.json())
				.then(data => {
					let items = []
					if (data.content && data.content.length > 0){
						items = data.content.map(d => { return this.props.dataConversor(d) })
					}
					this.setState({
						data: items,
						total : data.totalElements,
						page : data.number+1
					})
				})
		}
	}

	handleHeaderClick(params){

		console.log(params)

	}

	async handlePageChange(pageProp){

		console.log(pageProp)
		let page = pageProp.page;
		let size = pageProp.pageSize;
		
		if (pageProp.paginationMode === 'server'){
			await this.setState({
				page : page,
				size : size
			})
			this.fetchData()
		}
	}

	async handleFilterChange(filterOperators, type, pageProp){
		
		if (type === 'filter'){

			let filterParams = Object.keys(pageProp.filters).map(field => {

				let f = pageProp.filters[field]

				let filterVal = f.filterVal
				let operator
				if (filterVal.comparator !== undefined){
					operator = filterVal.comparator
				}
				else {
					operator = f.comparator
				}

				let value
				if (filterVal.number !== undefined){
					value = filterVal.number
				}
				else {
					value = filterVal.trim()
				}
				

				if (value && value.length > 0 && operator && operator.length > 0){
					return field + "__" + operator + "__" + value
				}
				else {
					return null
				}
			}).filter(x => x)

			await this.setState({
				filters : filterParams
	        })
		}

		this.fetchData()
	}

	downloadData(){

		const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.columns)
        }

		fetch(process.env.REACT_APP_SERVER_URL + "/" + this.props.entityName + "/excel", requestOptions)
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'table.xlsx';
					a.click();
				})
			})
			.catch(function() {
		        console.log("error");
		    });
	}

	rowEvents = {
		onClick: (e, row, rowIndex) => {
			window.open("/" + this.props.entityName + "/" + row.id, "_self");
		}
	};

    render() {
		return (
			
            <div>
            	<Grid container direction="row" spacing={2} justify="flex-start" alignItems="flex-start">
					<Grid item xs>
						<Card>
							<CardHeader title="Selecciona las columnas" />
							<CardContent>
								<Grid container direction="row" spacing={0} justify="flex-start" alignItems="flex-start">
									<Grid item>
										<MultiSelect columns={this.state.columns} 
											changeEvent={(cols) => { 
												//setFieldValue("columns", cols) 
											}}/>
									</Grid>
	                            	<Grid item>
	                            		<Button text="Descargar Excel" onClick={this.downloadData}/>
									</Grid>
	                            </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
               	</Grid>
				<Grid container spacing={1}>
					<Grid item xs>
						<DataGrid
							pagination
							autoHeight={true}
							columns={this.state.columns}
							rows={this.state.data}
							pageSize={this.state.size}
							rowCount={this.state.total}
							paginationMode="server"
							onPageChange={this.handlePageChange}
							onColumnHeaderClick={this.handleHeaderClick}
						/>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default Table;
