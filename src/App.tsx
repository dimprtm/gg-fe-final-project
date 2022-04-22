import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import CreatePlaylist from './components/CreatePlaylist';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/create-playlist" component={CreatePlaylist} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
