import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const SelectedTrackList = (props) => {
    const ButtonComponent = props.buttonComponent;

	return (
		<>
			{props.tracks.map((t, index) => (
				<Card className="selected-track" key={t.uri} sx={{maxHeight: 140}}>
                    <CardMedia
                    component="img"
                    sx={{ maxWidth: 100 }}
                    image={t.album.images[0].url}
                    alt={t.name} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <CardContent sx={{textAlign: 'left'}}>
                            <Typography component="div" variant="h5" style={{fontSize: 16}}>
                                {t.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" style={{fontSize: 12}}>
                                {t.album.artists[0].name}
                            </Typography>
                            <Box onClick={() => props.handleSelectedClick(t)} sx={{marginTop: 1}}>
                                <ButtonComponent />
                            </Box>
                        </CardContent>
                    </Box>
                </Card>
            ))}
		</>
	);
};

export default SelectedTrackList;
