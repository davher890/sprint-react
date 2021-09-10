import React from 'react'
import { Grid, Fab } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchButton: React.FC<any> = (props) => (
	<Grid container spacing={1}>
		<Grid item xs>
			<Fab variant="extended" size="large" aria-label="add"
				color={props.color || "secondary"}
				{...props}
			>
				<SearchIcon />{props.text}
			</Fab>
		</Grid>
	</Grid>
)
export default SearchButton