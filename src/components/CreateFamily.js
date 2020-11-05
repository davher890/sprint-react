import React, { Component } from "react";
import { 
    Form, InputGroup,
    Col, Row
} from 'react-bootstrap';
import AthletesTable from "./AthletesTable";

class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        if (this.props.id) {
            let id = this.props.id
            if (id){
                const headers = { 'Content-Type': 'application/json' }
                fetch(process.env.REACT_APP_SERVER_URL + "/families/" + id,  { headers })
                    .then(res => res.json())
                    .then(data => this.setState(data));
            }
        }
    }

    handleSubmit(event) {

        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.family)
        }


        fetch(process.env.REACT_APP_SERVER_URL + "/families", requestOptions)
            .then(res => res.json())
            .then(data => this.setState(data));
    }

    handleInputChange(event) {

        event.preventDefault();

        const target = event.target;
        const value = target.value;
        const name = target.name;

        let family = this.state.family
        family[name] = value

        this.setState({
            family : family
        });
    }

    dataConversor(d) {
        return {
            id : d.id,
            name : d.name || '', 
            birthDate: new Intl.DateTimeFormat('sq-AL').format(new Date(d.birthDate)), 
            gender: d.gender === 'male' ? 'Masculino' : 'Femenino',
            category : d.category,
            license : d.license,
            dorsalNumber : d.dorsalNumber
        }
    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <Row>
                        <Col>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Código</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form Control key="code" name="code" type="number" value={this.state.code} disabled/>
                            </InputGroup>
                        </Col>
                    </Row>
                </Form.Group>
                <AthletesTable filter={`familyId__=__${this.props.id}`}/>
            </Form>

        );
    }
}

export default CreateGroup;
