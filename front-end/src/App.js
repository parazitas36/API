import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PlayersStats } from './pages/PlayersStats'
import React, { useState, createContext } from 'react';
import { GetCookie } from './GetCookie';
import { Login } from './pages/Login';
import { Teams } from './pages/Teams';
import { Team } from './pages/Team';
import { Player } from './pages/Player';
import { Register } from './pages/Register';
import { Main } from './pages/Main';
import { Index } from './pages/Index';
import { Nav } from './Components/Nav';
import { Logout } from './pages/Logout';

export const AppContext = createContext();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const LoggedInHandler = () => {
    if (GetCookie("loggedin") == "true" && !loggedIn) { setLoggedIn(true); }
    if (GetCookie("loggedin") != "true" && loggedIn) { setLoggedIn(false); }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <AppContext.Provider value={{ logged: [loggedIn, setLoggedIn], loggedHandler: [LoggedInHandler] }}>
          {loggedIn && <Nav />}
          <Routes>
            <Route path="/" element={loggedIn ? <Main /> : <Index />} />
            <Route path="/playerstats" element={<PlayersStats />} />
            <Route path="/login" element={loggedIn ? <Main /> : <Login />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:teamid" element={<Team />} />
            <Route path="/teams/:teamid/players/:playerid" element={<Player />} />
            <Route path="/register" element={loggedIn ? <Main /> : <Register />} />
            <Route path="/main" element={<Main />} />
            <Route path="/logout" element={loggedIn ? <Logout /> : <Index />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );

}

export default App;
