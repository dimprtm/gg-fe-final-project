import React, { useState, useEffect } from "react";
import "./Spotify.css";
import axios from "axios";
import TrackList from "./TrackList";
import SearchBox from "./SearchBox";
import ButtonSelect from "./ButtonSelect";
import ButtonDeselect from "./ButtonDeselect";
import SelectedTrackList from "./SelectedTrackList";
import { useSelector, useDispatch } from "react-redux";
import { storeToken } from "../actions";
import { Button, TextField } from "@mui/material";
import NavBar from "./NavBar";

const spotify_tracks_endpoint = "https://api.spotify.com/v1/search";
const spotify_getprofile_endpoint = "https://api.spotify.com/v1/me";

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

const CreatePlaylist = () => {
  const [tracks, setTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("tab1");
  const [profile, setProfile] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistForm, setPlaylistForm] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const newToken = useSelector((state) => state.token);

  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      // setToken(localStorage.getItem("accessToken"));
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
  }, [getHashParams]);

  const getProfile = () => {
    fetch(spotify_getprofile_endpoint, {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setProfile(json);
        console.log(json);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleLogout = () => {
    window.location = "http://localhost:3000";
    localStorage.removeItem("accessToken");
  };

  const getTracks = async (keyword) => {
    // e.preventDefault()
    const { data } = await axios.get(spotify_tracks_endpoint, {
      headers: {
        Authorization: "Bearer " + newToken,
      },
      params: {
        q: keyword,
        type: "track",
        market: "ID",
      },
    });
    setTracks(data.tracks.items);
    console.log(data);
  };

  useEffect(() => {
    getTracks(keyword);
  }, [keyword]);

  const postPlaylist = async (e) => {
    e.preventDefault();
    const { playlist } = await axios({
      method: "post",
      url: `https://api.spotify.com/v1/users/${profile.id}/playlists`,
      headers: {
        Authorization: "Bearer " + newToken,
      },
      data: {
        title: playlistForm.title,
        description: playlistForm.description,
        public: false,
        collaborative: false,
      },
    });

    const trackUris = selectedTracks.map((item) => `${item.uri}, `);
    console.log(trackUris);

    axios({
      method: "post",
      url: `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
      headers: {
        Authorization: "Bearer " + newToken,
      },
      data: {
        position: 0,
        uris: trackUris,
      },
    });
  };

  useEffect(() => {
    const trackSelecteds = JSON.parse(localStorage.getItem("selected-tracks"));

    if (trackSelecteds) {
      setSelectedTracks(trackSelecteds);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("selected-tracks", JSON.stringify(items));
  };

  const addSelectedTrack = (track) => {
    const newSelectedList = [...selectedTracks, track];
    setSelectedTracks(newSelectedList);
    saveToLocalStorage(newSelectedList);
  };

  const removeSelectedTrack = (track) => {
    const newSelectedList = selectedTracks.filter(
      (selected) => selected.uri !== track.uri
    );

    setSelectedTracks(newSelectedList);
    saveToLocalStorage(newSelectedList);
  };

  const handlePlaylistFormChange = (e) => {
    const { name, value } = e.target;
    setPlaylistForm({ ...playlistForm, [name]: value });
  };

  return (
    <div className="column">
      <NavBar name={profile.display_name} logout={handleLogout} />
      <div className="container">
        <div className="left">
          <h2>Search Spotify Tracks</h2>
          <SearchBox
            searchValue={keyword}
            setKeyword={setKeyword}
            getTracks={getTracks}
          />
          <div className="album-wrapp">
            <TrackList
              tracks={tracks}
              handleSelectedClick={addSelectedTrack}
              buttonComponent={ButtonSelect}
            />
          </div>
        </div>
        <div className="right" style={{ marginTop: 20 }}>
          <div className="Tabs">
            <ul className="nav">
              <li
                className={activeTab === "tab1" ? "active" : ""}
                onClick={handleTab1}
              >
                Selected Tracks
              </li>
              <li
                className={activeTab === "tab2" ? "active" : ""}
                onClick={handleTab2}
              >
                Create Playlist
              </li>
            </ul>
            <div className="outlet">
              {activeTab === "tab1" ? (
                <SelectedTrackList
                  tracks={selectedTracks}
                  handleSelectedClick={removeSelectedTrack}
                  buttonComponent={ButtonDeselect}
                />
              ) : (
                <form
                  action=""
                  onSubmit={postPlaylist}
                  className="playlist-form"
                >
                  <TextField
                    id="title"
                    type="text"
                    name="title"
                    label="Title"
                    variant="outlined"
                    value={playlistForm.title}
                    onChange={handlePlaylistFormChange}
                    minLength="10"
                    margin="normal"
                    required
                    fullWidth
                  />

                  <TextField
                    id="description"
                    type="textarea"
                    name="description"
                    label="Description"
                    variant="outlined"
                    value={playlistForm.description}
                    onChange={handlePlaylistFormChange}
                    minLength="10"
                    fullWidth
                  />

                  <Button variant="contained" type={"submit"} sx={{ mt: 2 }}>
                    Create
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylist;
