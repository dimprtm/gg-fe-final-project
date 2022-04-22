import React from 'react';
import TextField from '@mui/material/TextField';

const SearchBox = (props) => {
	return (
        <form action="" onSubmit={props.getTracks}>
			<TextField 
				id="search-track" 
				label="Search tracks" 
				variant="outlined"
				type='text'
				className=''
				value={props.keyword}
				onChange={(e) => props.setKeyword(e.target.value)}
				fullWidth
			/>
        </form>
	);
};

export default SearchBox;