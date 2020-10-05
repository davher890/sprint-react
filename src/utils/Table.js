import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
	Button, 
	Row, 
	Col,
	Form
} from 'react-bootstrap';
import BootstrapTable  from 'react-bootstrap-table-next';
import Paginator from 'react-bootstrap-table2-paginator'
import Filter from 'react-bootstrap-table2-filter';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	columns : props.columns,
        	entityName : props.entityName,
        	data : [],
        	urlParams : '',
        	size : 10,
        	page : 1,
        	total : 0
    	}
		this.fetchData = this.fetchData.bind(this)
        this.handleTableChange = this.handleTableChange.bind(this)
        this.downloadData = this.downloadData.bind(this)
    }

    async componentDidMount() {
    	await this.fetchData()
    }

    async componentDidUpdate(prevProps) {

    	if (this.props.entityName && this.props.entityName !== this.state.entityName){
    		await this.setState({
    			entityName : this.props.entityName
    		})
    		this.fetchData()
    	}
	}

    async fetchData(){

    	if (this.state.entityName && this.state.entityName !== ""){
			const headers = { 'Content-Type': 'application/json' }
			const response = await fetch(process.env.REACT_APP_SERVER_URL + "/" + this.props.entityName + "?page=" + (this.state.page-1) + "&size=" + this.state.size + this.state.urlParams,  { headers })
			const data = await response.json();	

			let items = []
			if (data.content && data.content.length > 0){
				items = data.content.map(d => {
					return this.props.dataConversor(d)
				})
			}
			this.setState({
				data: items,
				total : data.totalElements,
				page : data.number+1
			})
		}
	}
	
	async handleTableChange(type, pageProp){
		
		if (type === 'pagination'){
			let page = pageProp.page;
			let size = pageProp.sizePerPage;
			
		    await this.setState({
	        	page : page,
	        	size : size
	        })
		}
		if (type === 'filter'){

			let filterParams = Object.keys(pageProp.filters).map(field => {

				let value = pageProp.filters[field].filterVal.trim()
				let operator = pageProp.filters[field].comparator

				if (value.length > 0){
					return field + "__" + operator + "__" + value
				}
				else {
					return null
				}
			}).filter(x => x)

			let urlParams = ''
			if (filterParams.length > 0){
				urlParams = '&filters=' + filterParams.reduce((accumulator, currentValue) => accumulator + ',' + currentValue)
			}
			await this.setState({
	        	urlParams : urlParams
	        })
		}

		this.fetchData()
	}

	downloadData(){

		fetch(process.env.REACT_APP_SERVER_URL + "/" + this.props.entityName + "/excel")
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
			<Form.Group>
				<Row>
					<Col>
						<Button href={`/${this.state.entityName}`}>Crear</Button>
					</Col>
					<Col>
						<Button onClick={this.downloadData}>Descargar Excel</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<BootstrapTable striped bordered hover 
							remote
							keyField="id" 
							data={this.state.data}
							columns={this.state.columns}
							onTableChange={ this.handleTableChange }
							filter={ Filter() }
							pagination={Paginator({page : this.state.page, sizePerPage: this.state.size, totalSize : this.state.total })}
							noDataIndication="Sin Datos"
							rowEvents={ this.rowEvents }
						>
						</BootstrapTable>
					</Col>
				</Row>
			</Form.Group>
		)
	}
}

export default Table;
