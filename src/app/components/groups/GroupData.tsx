import * as React from "react"
import { 
    InputGroup, Row, Col, Button, Form, Card
} from 'react-bootstrap';
import { Formik, Field } from 'formik';

import { connect } from "react-redux";
import { addGroup, getGroup } from "../../redux/actions/groups";
import { getTrainers } from "../../redux/actions/trainers";
import { getSchedules } from "../../redux/actions/schedules";

class ConnectedForm extends React.Component<any, any> {

    schedules = []
    trainers = []
    entityName2 = ""
    
    scheduleId = 0
    schedule = ''

    constructor(props: any) {
        super(props);
        this.state = {}
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
                
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            if (id) {
                this.props.getGroup(id)
            }
        }

        this.props.getTrainers()
        this.props.getSchedules()

        // let trainersPromise = new Promise((resolve, reject) => {
        //     fetch(process.env.REACT_APP_SERVER_URL + "/trainers/all",  { headers })
        //         .then(res => res.json())
        //         .then(data => {
        //             this.trainers = data
        //             this.setState({trainers : data})
        //             resolve()
        //         });
        // })

        // Promise.all([schedulesPromise, trainersPromise]).then((v) => {
        //     if (this.props.match.params) {
        //         let id = this.props.match.params.id
        //         if (id){
        //             fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + id,  { headers })
        //                 .then(res => res.json())
        //                 .then(data => this.setState(data));
        //         }
        //     }
        // })
    }

    handleSubmit() {

        this.props.addGroup(JSON.stringify(this.state))

        // fetch(process.env.REACT_APP_SERVER_URL + "/groups", requestOptions)
        //     .then(res => res.json())
        //     .then(data => this.setState(data));
    }

    render() {
        return (
            <Formik enableReinitialize 
                initialValues={{
                    // Other
                    schedules : this.props.schedules,
                    trainers: this.props.trainers,
                    // Group data
                    name: this.props.group.name || '',
                    scheduleIds: this.props.group.scheduleIds || [],
                    specialization: this.props.group.specialization,
                    trainerId: this.props.group.trainerId || ''
                }}
                validate={(values) => {
                    let errors: any = {};

                    if (values.schedules === '') errors.schedules = 'Campo obligatorio'
                    if (values.trainers === '') errors.trainers = 'Campo obligatorio'
                    if (values.name === '') errors.name = 'Campo obligatorio'
                    if (values.scheduleIds === '') errors.scheduleIds = 'Campo obligatorio'
                    if (values.specialization === '') errors.specialization = 'Campo obligatorio'
                    if (values.trainerId === '') errors.trainerId = 'Campo obligatorio'

                    // Object.keys(values).forEach(value => {
                    //     if(values[value] === ''){
                    //         errors[value] = 'Campo obligatorio'; 
                    //     }
                    // })

                    //check if my values have errors
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    alert("Guardando...");
                    this.setState(values)
                    setSubmitting(false);
                    this.handleSubmit()
                }}
                >
                {({ handleSubmit, handleChange, values, touched, setFieldValue, setFieldTouched, setValues, errors }) => (

    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group><Row>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Datos Personales</Card.Title>
                                    <Form.Group><Row>
                                        <Col>
                                            <Form.Group>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Nombre</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="name" type="text" value={values.name} className='form-control'/>
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Especialización</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="specialization" value={values.specialization} as="select" 
                                                        className={`form-control ${touched.specialization && errors.specialization ? "is-invalid" : ""}`}>
                                                        <option></option>
                                                        <option value="true">Si</option>
                                                        <option value="false">No</option>
                                                    </Field>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                  <InputGroup.Text>Horario</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Field name="scheduleIds" value={values.scheduleIds} as="select" multiple className='form-control'>
                                                    {
                                                        values.schedules.map((sch: any) => {
                                                            return <option key={sch.id} value={sch.id}>{sch.day} {sch.startHour}:{sch.startMinute} - {sch.endHour}:{sch.endMinute}</option>
                                                        })
                                                    }
                                                </Field>
                                            </InputGroup>
                                        </Col>
                                        <Col>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                  <InputGroup.Text>Entrenador</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Field name="trainerId" value={values.trainerId} as="select" className='form-control'>
                                                    <option key="blank_trainer">-</option>
                                                    {
                                                        values.trainers.map((tr: {id: number, name: string}) => {
                                                            return <option key={tr.id} value={tr.id}>{tr.name}</option>
                                                        })
                                                    }
                                                </Field>
                                            </InputGroup>
                                        </Col>
                                    </Row></Form.Group>
                                    <Form.Group><Row>
                                        <Col>
                                            <Button type="submit">Submit</Button>
                                        </Col>
                                    </Row></Form.Group>
                                </Card.Body>
                            </Card>
                        </Row></Form.Group>
                    </Form>
                )}
            </Formik>
            
        );
    }
}

const mapStateToProps = (state: any) => {
    return { 
        group: state.group_reducer.group,
        trainers: state.trainer_reducer.trainers,
        schedules: state.schedule_reducer.schedules
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addGroup: (group: any) => dispatch(addGroup(group)),
        getGroup: (id: any) => dispatch(getGroup(id)),
        getTrainers: () => dispatch(getTrainers()),
        getSchedules: () => dispatch(getSchedules())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedForm);
