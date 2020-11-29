import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';

import Autocomplete from '@material-ui/lab/Autocomplete';

class CreateAthlete extends Component {

	render() {
    
        return (
        	<Autocomplete
                id={this.props.name}
                name={this.props.name}
                options={this.props.options}
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) => option.id === value.id}
                value={{id:this.props.value, name:this.props.options.find(e => e.id === this.props.value) ? this.props.options.find(e => e.id === this.props.value).name : ''}}
                onChange={this.props.onChange}
                renderInput={(params) => 
                    <TextField {...params} label={this.props.label} error={this.props.error}
                    />
                }
            />
        )
    }
}
export default CreateAthlete;

