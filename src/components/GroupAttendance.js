import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
    InputGroup,
    Button, Col, 
    Row, Card, Form
} from 'react-bootstrap';
import { Formik, Field } from 'formik';

class GroupAttendance extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount(){
	    const headers = { 'Content-Type': 'application/json' }
		fetch(process.env.REACT_APP_SERVER_URL + "/groups/all",  { headers })
            .then(res => res.json())
            .then(data => {
                data.push({id:'', name:''})
                this.setState({ groups : data})
            });
	}

	handleFormSubmit() {

        fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + this.state.groupId + "/attendance")
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

	render() {
		return (
			<Formik enableReinitialize
                initialValues={{
                    groups : this.state.groups || [],
                    groupId: this.state.groupId || ''
                }}
                validate={(values) => {
                	let errors = {};
                	return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    alert("Guardando...");
                    this.setState(values)
                    setSubmitting(false);
                    this.handleFormSubmit()
                }}
                >
            	{({ handleSubmit, handleChange, values, touched, setFieldValue, setFieldTouched, setValues, errors }) => (
            		<Form onSubmit={handleSubmit}>
						<Form.Group><Row>
							<Card>
								<Card.Body>
									<Form.Group>
										<Row>
											<Col>
												<InputGroup>
				                                    <InputGroup.Prepend>
				                                      <InputGroup.Text>Grupos</InputGroup.Text>
				                                    </InputGroup.Prepend>
				                                    <Field name="groupId" value={values.groupId} as="select" className='form-control'>
				                                        {
				                                            values.groups.map(group => {
				                                                return (<option key={group.id} value={group.id}>{group.name}</option>)
				                                            })
				                                        }
				                                    </Field>
				                                </InputGroup>
			                                </Col>
			                                <Col>
	                                            <Button type="submit">Submit</Button>
	                                        </Col>
			                            </Row>
			                        </Form.Group>

                                        
                                    
			                    </Card.Body>
			                </Card>
			            </Row></Form.Group>
		           	</Form>
                )}
            </Formik>
		)
	}
}
export default GroupAttendance;
