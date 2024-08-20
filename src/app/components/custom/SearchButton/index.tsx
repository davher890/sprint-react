import React from 'react'
import { Button } from '@mui/material';
import Icon from '@mui/icons-material/Search';

const SearchButton: React.FC<any> = (props) => (
	<Button color={props.color || "secondary"} {...props}>
		<Icon />{props.children}
	</Button>
)
export default SearchButton