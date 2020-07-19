import React, { Component } from "react";
import { 
    Form, InputGroup,
    Container, 
    Row, Col,
    Button
} from 'react-bootstrap';
import Table from "../utils/Table";
import { textFilter } from 'react-bootstrap-table2-filter';

class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	group : {},
            schedules : [],
            trainers : [],
            entityName2 : "",
            columns : [
                { dataField: 'name', text: 'Nombre', filter: textFilter() }
            ],
            columnsAthlete : [
                { dataField: 'name', text : 'Nombre', filter: textFilter() }, 
                { dataField: 'birthDate', text : 'Fecha de Nacimiento' }, 
                { dataField: 'gender', text : 'Genero', filter: textFilter() }, 
                { dataField: 'category', text : 'Categoria', filter: textFilter() }, 
                { dataField: 'license', text : 'Licencia' }, 
                { dataField: 'dorsal', text : 'Dorsal'}
            ],
            scheduleId : 0,
            schedule : ''
        };
        this.handleGroupInputChange = this.handleGroupInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitQuery = this.handleSubmitQuery.bind(this);
        this.handleMultipleSelectChange = this.handleMultipleSelectChange.bind(this);
    }

    componentDidMount(){
                
        const headers = { 'Content-Type': 'application/json' }
        let schedulesPromise = new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_SERVER_URL + "/schedules/all",  { headers })
                .then(res => res.json())
                .then(data => {
                    this.setState({ schedules : data})
                    resolve()
                });
        })

        let trainersPromise = new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_SERVER_URL + "/trainers/all",  { headers })
                .then(res => res.json())
                .then(data => {
                    this.setState({ trainers : data})
                    resolve()
                });
        })

        Promise.all([schedulesPromise, trainersPromise]).then((v) => {
            if (this.props.match.params) {
                let id = this.props.match.params.id
                if (id){
                    fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + id,  { headers })
                        .then(res => res.json())
                        .then(data => this.setState({ group : data}));
                }
            }
        })
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

    handleGroupInputChange(event) {

        event.preventDefault();

        const target = event.target;
        const value = target.value;
        const name = target.name;

        let group = this.state.group
        group[name] = value

        this.setState({
            group : group
        });
    }

    handleInputChange(event) {

        event.preventDefault();

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    }

    handleMultipleSelectChange(event){

        event.preventDefault();

        var options = event.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        let group = this.state.group
        group.scheduleIds = value

        this.setState({
            group : group
        });
    }

    handleSubmitQuery(event) {

        event.preventDefault()

        this.setState({
            entityName2 : "groups/" + this.state.group.id + "/schedules/" + this.state.scheduleId + "/athletes"
        });
    }

    athleteDataConversor(d) {
        return {
            id : d.id,
            name : d.name, 
            birthDate: new Intl.DateTimeFormat('sq-AL').format(new Date(d.birthDate)), 
            gender: d.gender === 'male' ? 'Masculino' : 'Femenino',
            category : d.category,
            license : d.license,
            dorsal : d.dorsalNumber
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Nombre</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control key="name" id='name' name="name" type="text" value={this.state.group.name} onChange={this.handleInputChange}/>
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text>Horario</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control name="scheduleIds" value={this.state.group.scheduleIds} as="select" multiple onChange={this.handleMultipleSelectChange}>
                                        {
                                            this.state.schedules.map(sch => {
                                                return <option key={sch.id} value={sch.id}>{sch.day} {sch.startHour}:{sch.startMinute} - {sch.endHour}:{sch.endMinute}</option>
                                            })
                                        }
                                    </Form.Control>
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text>Entrenador</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control name="trainerId" value={this.state.group.trainerId} as="select" onChange={this.handleGroupInputChange}>
                                        <option key="blank_trainer">-</option>
                                        {
                                            this.state.trainers.map(tr => {
                                                return <option key={tr.id} value={tr.id}>{tr.name}</option>
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
                </Row>
                <Row>
                    <Form onSubmit={this.handleSubmitQuery}>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text>Horarios</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control name="scheduleId" value={this.state.scheduleId} as="select" onChange={this.handleInputChange}>
                                        <option key="blank_schedule">-</option>
                                        {
                                            this.state.schedules.map(sch => {
                                                return <option key={sch.id} value={sch.id}>{sch.day} {sch.startHour}:{sch.startMinute} - {sch.endHour}:{sch.endMinute}</option>
                                            })
                                        }
                                    </Form.Control>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table 
                                    columns={this.state.columnsAthlete} 
                                    entityName={this.state.entityName2}
                                    dataConversor={this.athleteDataConversor}>
                                </Table>
                            </Col>
                        </Row>
                    </Form>
                </Row>
        </Container>
            
        );
    }
}

export default CreateGroup;
