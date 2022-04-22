import React from "react";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const NavBar = (props) =>  {
    return (
        <AppBar position="static" sx={{height: 60}}>
            <Container sx={{display: "flex", justifyContent: 'space-between', alignItems: 'center', margin: 'auto'}}>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{  }}
                >
                    Welcome, {props.name}
                </Typography>
                <Button onClick={props.logout} variant="contained" color='secondary'>Logout</Button>
            </Container>
        </AppBar>
    )
}

export default NavBar;