import React from 'react';
import AlbumImg from './Album/AlbumImg';
import Artist from './Album/Artist';
import SongTitle from './Album/SongTitle';
import ButtonDeselect from './ButtonDeselect';
import ButtonSelect from './ButtonSelect';

const TrackList = (props) => {
    const ButtonComponent = props.buttonComponent;

    const millisToMinutesAndSeconds = (millis) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

	return (
		<>
			{props.tracks.map((t, index) => (
				<div className="album" key={t.uri}>
                    <AlbumImg  className="album-img" albumimgUrl={t.album.images[0].url}/>
                    <div className="text">
                        <SongTitle songTitle={t.name}/>
                        <Artist artistName={t.album.artists[0].name} />
                        <p>{millisToMinutesAndSeconds(t.duration_ms)}</p>
                    </div>
                    <div
						onClick={() => props.handleSelectedClick(t)}
						className='overlay d-flex align-items-center justify-content-center'
                    >
                        <ButtonComponent />
                    </div>
                </div>
            ))}
		</>
	);
};

export default TrackList;
