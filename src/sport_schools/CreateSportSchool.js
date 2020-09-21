import React, { Component } from "react";
import { 
    Form, InputGroup,
    Button,
    Col, Row, Card
} from 'react-bootstrap';
import { Formik, Field } from 'formik';

class CreateSportSchool extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	sportSchool : {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        if (this.props.match.params) {
            let id = this.props.match.params.id
            if (id){
                const headers = { 'Content-Type': 'application/json' }
                fetch(process.env.REACT_APP_SERVER_URL + "/sport_schools/" + id,  { headers })
                    .then(res => res.json())
                    .then(data => this.setState({ sportSchool : data}));
            }
        }
    }

    handleSubmit(event) {

        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.sportSchool)
        }

        fetch(process.env.REACT_APP_SERVER_URL + "/sport_schools", requestOptions)
            .then(response => console.log(response))
            .then(data => this.setState(data));
    }

    render() {
        return (

            <Formik enableReinitialize 
                initialValues={{
                    name: this.state.sportSchool.name || '',
                    municipality: this.state.sportSchool.municipality || '',
                    address: this.state.sportSchool.address || '',
                }}
                validate={(values) => {
                    let errors = {};

                    Object.keys(values).forEach(value => {
                        if(values[value] === ''){
                            errors[value] = 'Valid ' + value + ' Required'; 
                        }
                    })

                    //check if my values have errors
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    alert("Form is validated! Submitting the form...");
                    setSubmitting(false);
                    this.handleSubmit()
                }}
            >
                {({ handleSubmit, handleChange, values, touched, setFieldValue, setFieldTouched, errors }) => (

                    <Form onSubmit={handleSubmit}>
                        <Form.Group><Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Datos de la Escuale Deportiva</Card.Title>
                                        <Form.Group><Row>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Nombre</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control key="name" id='name' name="name" type="text" value={values.name}
                                                        className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}/>
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Municipio</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control key="municipality" id='municipality' name="municipality" type="text" value={values.municipality}
                                                        className={`form-control ${touched.municipality && errors.municipality ? "is-invalid" : ""}`}/>
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Dirección</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control key="address" id='address' name="address" type="text" value={values.address}
                                                        className={`form-control ${touched.address && errors.address ? "is-invalid" : ""}`}/>
                                                </InputGroup>
                                            </Col>
                                        </Row></Form.Group>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row></Form.Group>
                        <Form.Group><Row>
                            <Col md="auto">
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row></Form.Group>
                    </Form>
                )}
            </Formik>
        );
    }
}

export default CreateSportSchool;
