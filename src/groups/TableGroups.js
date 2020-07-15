import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
	Container, 
	Row, Col,
	Form, Button,
	InputGroup
} from 'react-bootstrap';
import Table from "../utils/Table";
import { textFilter } from 'react-bootstrap-table2-filter';

class TableGroups extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        	columns : [
        		{ dataField: 'name', text: 'Nombre', filter: textFilter() }
    		],
    		entityName : 'groups',
    		groups : [],
    		schedules : [],
    		groupId : 0,
    		scheduleId : 0
        };
        this.handleGroupChange = this.handleGroupChange.bind(this);

    }

    async componentDidMount(){
                
        const headers = { 'Content-Type': 'application/json' }
        await fetch(process.env.REACT_APP_SERVER_URL + "/groups/all",  { headers })
            .then(res => res.json())
            .then(data => {
                this.setState({ groups : data})
            });
    }

    dataConversor(d) {
    	return {
			id : d.id,
			name : d.name
		}
    }

	handleSubmit(event) {

        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.group)
        }

        fetch(process.env.REACT_APP_SERVER_URL + "/groups", requestOptions)
            .then(response => console.log(response))
            .then(data => this.setState(data));
    }

    async handleGroupChange(event) {

        event.preventDefault();
        const target = event.target;
        const value = target.value;

        await this.setState({
            groupId : value
        });
        const headers = { 'Content-Type': 'application/json' }
        fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + this.state.groupId + "/schedules", { headers })
            .then(res => res.json())
            .then(data => this.setState({ schedules : data}));
    }

    render() {
		return (
			<Container>
				<Table 
					columns={this.state.columns} 
					entityName={this.state.entityName}
					dataConversor={this.dataConversor}>
				</Table>

				<Form onSubmit={this.handleSubmit}>
                	<Row>
	                	<Col>
	                        <InputGroup>
	                            <InputGroup.Prepend>
	                              <InputGroup.Text>Grupo</InputGroup.Text>
	                            </InputGroup.Prepend>
	                            <Form.Control name="groups" value={this.state.groups} as="select" onChange={this.handleGroupChange}>
	                                {
	                                    this.state.groups.map(group => {
	                                        return <option key={group.id} value={group.id}>{group.name}</option>
	                                    })
	                                }
	                            </Form.Control>
	                        </InputGroup>
	                    </Col>
	                    <Col>
	                        <InputGroup>
	                            <InputGroup.Prepend>
	                              <InputGroup.Text>Horarios</InputGroup.Text>
	                            </InputGroup.Prepend>
	                            <Form.Control name="schedules" value={this.state.schedules} as="select" >
	                                {
	                                    this.state.schedules.map(sch => {
	                                        return <option key={sch.id} value={sch.id}>{sch.day} {sch.startHour}:{sch.startMinute} - {sch.endHour}:{sch.endMinute}</option>
	                                    })
	                                }
	                            </Form.Control>
	                        </InputGroup>
	                    </Col>
	                </Row>
	                <Row>
	                	<Col>
	                    	<Button type="submit">Submit</Button>
	                    </Col>
	                </Row>
	            </Form>
			</Container>
		)
	}
}

export default TableGroups;


