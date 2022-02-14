import React from 'react'
import { Button } from '@material-ui/core';
import Icon from '@material-ui/icons/CloudDownload';

import Spinner from '../Spinner'
import { connect } from "react-redux";

import { apiCall } from "../../../redux/actions/api";

const DownloadButton: React.FC<any> = (props) => {
	return (
	<div> { props.loading ? <Spinner/> : 
		<Button color={props.color || "secondary"} {...props} onClick={() => {
				props.apiCall();
				props.onClick();
			}}>
			<Icon />{props.children || 'Descargar'}
		</Button>
		}
	</div>
	)
}


function mapStateToProps(state: any) {
	return {
        loading: state.api_reducer.loading
    };
}

const mapDispatchToProps = {
    apiCall
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DownloadButton);