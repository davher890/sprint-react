import React from 'react'
import { Button } from '@material-ui/core';
import Icon from '@material-ui/icons/CloudDownload';

const DownloadButton: React.FC<any> = (props) => (
	<Button color={props.color || "secondary"} {...props}>
		<Icon />{props.children || 'Descargar'}
	</Button>
)
export default DownloadButton;