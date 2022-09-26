import React, { useState } from "react"

import { Grid, AppBar, Toolbar } from '@material-ui/core';
import moment, { Moment } from 'moment'

import TextField from '../custom/TextField';
import Card from '../custom/Card';
import SaveButton from '../custom/SaveButton'
import Select from '../custom/Select'

import Functions from "../../utils/Functions";

import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { addIncidence, getIncidence, getIncidenceComments } from "../../redux/actions/incidences";
import { addIncidenceComments } from "../../redux/actions/incidenceComments";

const NewIncidenceForm: React.FC<any> = (props) => {

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    
    const saveIncidence = () => {
        if (title && description){
            props.addIncidence({ title: title,  description: description, status: status, id: props.incidence.id })
        }
    }

    const saveIncidenceComment = () => {
        if (message){
            props.addIncidenceComments({ message: message, incidenceId: props.incidence.id }).then(() => {
                props.getIncidenceComments(props.incidence.id)
                setMessage('')
            })
        }
    }

    React.useEffect(() => {
        props.getIncidence(props.id)
    }, [props.id])

    React.useEffect(() => {
        if (props.incidence.id){
            setTitle(props.incidence.title)
            setStatus(props.incidence.status)
            setDescription(props.incidence.description)
            props.getIncidenceComments(props.incidence.id)
        }
    }, [props.incidence])

    return (
        <>
            <Grid container direction="column" spacing={3}>
                <Grid item xs>
                    <Card title="Datos de la Incidencia">
                        <Grid container spacing={2}>
                            <Grid container item xs={3} direction="column">
                                <Grid item xs>
                                    <TextField name="title" label="Titulo" value={title}
                                        error={!title}
                                        onChange={(e: any) => {
                                            setTitle(e.target.value);
                                        }} 
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Select name="status" label="Estado" 
                                        options={Functions.getIncidenceStatus()} value={status}
                                        onChange={(value: string, item: any) => {
                                            setStatus(item.id)
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <TextField fullWidth name="description" label="Description" 
                                    error={!description} rows={20}
                                    value={description} multiline 
                                    onChange={(e: any) => {
                                        setDescription(e.target.value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                { props.incidence && props.incidence.id && 
                    <Card title="Comentarios" key={`incidence-${props.incidence.id}`}>
                        <Grid container direction="column" spacing={2}>
                            { props.incidence_comments.map((d: { id: number, message: string, createdAt: string, createdByName: string}) => {
                                return <Grid container item key={`incidence-${props.incidence.id}-comment-${d.id}`}>
                                    <Grid item xs={2}>{ moment(new Date(d.createdAt)).format('DD/MM/YYYY hh:mm:ss') }</Grid>
                                    <Grid item xs={2}>{d.createdByName}</Grid>
                                    <Grid item xs>{d.message}</Grid>
                                </Grid>
                            })
                            }
                            <Grid container item direction="row" xs>
                                <Grid item xs>
                                    <TextField fullWidth name="comment" label="Comentario" 
                                        error={!message} rows={10}
                                        value={message} multiline 
                                        onChange={(e: any) => {
                                            setMessage(e.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <SaveButton text='Guardar' onClick={saveIncidenceComment} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                }
            </Grid>
            <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                <Toolbar>
                    <SaveButton text='Guardar' onClick={saveIncidence} />
                </Toolbar>
            </AppBar>
        </>
    );
}

const mapDispatchToProps = {
    addIncidence,
    getIncidence,
    addIncidenceComments,
    getIncidenceComments
}

const mapStateToProps = (state: any) => {
    return { 
        incidence: state.incidence_reducer.incidence,
        incidence_comments: state.incidence_reducer.incidence_comments
    };
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(NewIncidenceForm);

const WithRouterWrapper = () => {
    let { id } = useParams()

    return (
        <ConnectedComponent id={id}></ConnectedComponent>
    )
}
export default WithRouterWrapper