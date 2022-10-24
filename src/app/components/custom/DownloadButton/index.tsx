import React from 'react'
import { Button } from '@material-ui/core';
import Icon from '@material-ui/icons/CloudDownload';

import Spinner from '../Spinner'
import { connect } from "react-redux";

const DownloadButton: React.FC<any> = (props) => {

	return (
		<div> { props.loading ? <Spinner/> : 
			<Button color={props.color || "secondary"} {...props} onClick={() => {
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

export default connect(
	mapStateToProps
)(DownloadButton);