import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import { AppContext } from '../App';

export const Main = () => {
    const { logged: [loggedIn, setLoggedIn], loggedHandler: [LoggedInHandler] } = useContext(AppContext);
    LoggedInHandler();
    const navigate = useNavigate();
    if ( !loggedIn ) { navigate("/login") }

  return (
        <div className='Main'>
            <center>
                <div className='welcomeWindow'>
                    <div className='welcome-title'>Welcome To The NBA STATS API</div>
                    <div className='welcome-header'>Here you can</div>
                    <div className='welcome-text'>
                        Look at the all players stats <br></br>
                        Look at the teams lineups <br></br>
                        Mark your favorite players and/or teams <br></br>
                        Keep track of your favorite players stats
                    </div>
                    <button className='tryButton'>Try It Now</button>
                </div>
            </center>
        </div>
    );
}
