import React, { useEffect } from "react";
import './Spotify.css';
import SpotifyLogo from '../../src/assets/SpotifyLogo.svg';
import { storeToken } from "../actions";
import { useDispatch } from "react-redux";
import {Redirect} from 'react-router-dom';
import Button from '@mui/material/Button';

const spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const spotify_auth_endpoint = "https://accounts.spotify.com/authorize";
const redirect_uri = "https://https://gg-fe-final-project.vercel.app";
const scope = "user-read-private playlist-modify-private";

const getHashParams = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};

const Login = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
        //   setToken(localStorage.getItem("accessToken"));
          dispatch(storeToken(localStorage.getItem("accessToken")));
        }
    }, [dispatch]);

    useEffect(() => {
        if (window.location.hash) {
          const { access_token, expires_in, token_type } = getHashParams(
            window.location.hash
          );
    
          localStorage.setItem("accessToken", access_token);
          localStorage.setItem("tokenType", token_type);
          localStorage.setItem("expiresIn", expires_in);
        }
    }, []);

    const handleLogin = () => {
        window.location = `${spotify_auth_endpoint}?client_id=${spotify_client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=token&show_dialog=true`;
    };

    return (
        <div className="">
      {localStorage.getItem("accessToken") ? (
        <Redirect to="/create-playlist" />
      ) : (
        <div className="login">
          <Button 
          onClick={handleLogin}
          className="btn-spotify"
          style={{backgroundColor: "rgb(31,214,96)", color: "black"}}
          >
            <img
              src={SpotifyLogo}
              className="spotify-logo"
              alt="spotify-logo"
            />
            Login with Spotify
          </Button>
        </div>
      )}
    </div>
    );
}

export default Login;
