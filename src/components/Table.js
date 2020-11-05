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
import { Formik, Field } from 'formik';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	columns : props.columns.map(c => { c.show = true; return c; }),
        	entityName : props.entityName,
        	data : [],
        	urlParams : '',
        	size : 10,
        	page : 1,
        	total : 0,
        	showExcel : props.showExcel || false,
        	showCreate : props.showCreate ||false,
        	fixedFilters : props.filter ? props.filter.split(",") : [],
        	filters : []
    	}
		this.fetchData = this.fetchData.bind(this)
        this.handleTableChange = this.handleTableChange.bind(this)
        this.downloadData = this.downloadData.bind(this)
    }

    componentDidMount(prevProps, nextProps){
        if(prevProps !== this.props){
			this.fetchData()
    	}
    }

    async componentDidUpdate(prevProps) {

    	if (this.props.entityName && this.props.entityName !== this.state.entityName){
    		await this.setState({
    			entityName : this.props.entityName
    		})
    		this.fetchData()
    	}
	}

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
						items = data.content.map(d => {
							return this.props.dataConversor(d)
						})
					}
					this.setState({
						data: items,
						total : data.totalElements,
						page : data.number+1
					})
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
		else if (type === 'filter'){

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
			<Formik enableReinitialize
                initialValues={{
                	columns : this.state.columns,
                	data : this.state.data,
                	page : this.state.page,
                	size : this.state.size,
                	total : this.state.total,
                	entityName: this.state.entityName,
                	showExcel: this.state.showExcel || false
                }}
                validate={(values) => {
                    let errors = {};

                    Object.keys(values).forEach(value => {
                        if((values[value] === '') && values.required.includes(value)){
                            errors[value] = 'Campo obligatorio'; 
                        }
                    })

                    //check if my values have errors
                    return errors;
                }}
                >
                {({ handleChange, values, touched, setFieldValue, setFieldTouched, setValues, errors }) => (

                    <Form>
						<Form.Group>
							<Row>
								<Col md="auto" style={{ display: values.showCreate ? "block" : "none" }}>
									<Button href={`/${values.entityName}`}>Crear</Button>
								</Col>
								<Col md="auto" style={{ display: values.showExcel ? "block" : "none" }}>
									<Button onClick={this.downloadData}>Descargar Excel</Button>
								</Col>
								<Col md="auto">
									<Form.Group>  
		                                {
		                                    values.columns.map(c => {
		                                        return (
		                                            <Row key={`row${c.text}`}><Col>
		                                            	<Field 
			                                                type="checkbox" 
			                                                name="selectedColumns" 
			                                                key={`column${c.text}`} 
			                                                checked={values.columns.some(column => column.text === c.text && column.show === true)}
			                                                onChange={e => {
			                                                    const idx = values.columns.findIndex(column => column.text === c.text);
			                                                    if (e.target.checked) {
			                                                        values.columns[idx].show = true
			                                                    } else {
			                                                        values.columns[idx].show = false
			                                                    }
			                                                    setFieldValue('columns', values.columns)
			                                                }}
		                                                />
		                                                {c.text}
		                                            </Col></Row> 
		                                        )
		                                    })
		                                }
		                            </Form.Group>
								</Col>
							</Row>
							<Row>
								<Col>
									<BootstrapTable striped bordered hover 
										remote
										keyField="id" 
										data={values.data}
										columns={values.columns.filter(c => c.show === true)}
										onTableChange={ this.handleTableChange }
										filter={ Filter() }
										pagination={Paginator({page : values.page, sizePerPage: values.size, totalSize : values.total })}
										noDataIndication="Sin Datos"
										rowEvents={ this.rowEvents }
									>
									</BootstrapTable>
								</Col>
							</Row>
						</Form.Group>
					</Form>
                )}
            </Formik>
		)
	}
}

export default Table;
