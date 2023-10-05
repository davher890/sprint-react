import * as React from "react"

import { Container, Grid } from '@material-ui/core';

import AthleteTable from "../athletes/AthleteTable";
import TextField from "../../components/custom/TextField";

class FamilyData extends React.Component<any, any> {
    constructor(props: any) {
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

    handleSubmit(event: any) {

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

    handleInputChange(event: any) {

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

    dataConversor(d: any) {
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
            <Container fixed>
				<React.Suspense fallback={<div>Cargando...</div>}>
					<Grid container direction="column" spacing={3}>
						<Grid item xs>
							<TextField disabeld text="Código de familia" value={this.state.code} />
						</Grid>
                        <Grid item xs>
                            <AthleteTable/>
                        </Grid>
                    </Grid>
                </React.Suspense>
            </Container>
        );
    }
}

export default FamilyData;
