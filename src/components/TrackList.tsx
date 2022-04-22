import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const TrackList = (props) => {
    const ButtonComponent = props.buttonComponent;

    const millisToMinutesAndSeconds = (millis: any) => {
        const minutes: any = Math.floor(millis / 60000);
        const seconds: any = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

	return (
		<>
			{props.tracks.map((t, index) => (
				<Card className="album" key={t.uri} sx={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between'}}>
                    <CardMedia
                        component="img"
                        alt={t.name}
                        height="240"
                        image={t.album.images[0].url}
                    />
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div">
                            {t.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {t.album.artists[0].name}
                        </Typography>
                        <Typography variant='caption'>{millisToMinutesAndSeconds(t.duration_ms)}</Typography>
                    </CardContent>
                    <CardActions
                        sx={{alignSelf: 'flex-end'}}
						onClick={() => props.handleSelectedClick(t)}
                    >
                        <ButtonComponent />
                    </CardActions>
                </Card>
            ))}
		</>
	);
};

export default TrackList;
