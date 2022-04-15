import React, { useState, useContext } from 'react'
import { useGetDataById } from '../hooks/GetDataById';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../Components/Loading';
import { AppContext } from '../App';
import './Player.css';

export const Player = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const { teamid, playerid } = useParams();

    const { logged: [loggedIn, setLoggedIn], loggedHandler: [LoggedInHandler] } = useContext(AppContext);
    LoggedInHandler();
    const navigate = useNavigate();
    if (!loggedIn) { navigate("/login") }

    useGetDataById('http://192.168.1.101:8080/teams/' + teamid + "/players/", playerid, { setIsLoading, setData })

    if (isLoading) {
        return <div>Data is loading...</div>
    }

    if (data) {
        if (data['status'] === 401) {
            setTimeout(() => {
                navigate('/login')
            }, 3000)
            return <div>Session has ended. You must to re-login to continue.</div>
        }
        const player = data['data'];
        return (
            <div className="playerdiv">
                <div className="player-grid">
                    <div className='player-img'>
                        <div className="img-wrapper">
                            <img className="player-image" src={"https://cdn.nba.com/headshots/nba/latest/1040x760/"+player['PLAYER_ID']+".png"}/>
                        </div>
                        <div className='playername'>
                            {player['PLAYER_NAME']} | Age: {player['AGE']}
                        </div>
                    </div>
                    <div className='player-info'>
                        <div className="playerstats-col">
                            <div className="player-stats">
                                <h4 className="title">Season Averages</h4>
                                <div className="player-stats-col col1">
                                    PTS: {(Math.round(player['PTS'] / player['GP'] * 100) / 100).toFixed(2)}
                                </div>
                                <div className="player-stats-col col2">
                                    APG: {(Math.round(player['AST'] / player['GP'] * 100) / 100).toFixed(2)}
                                </div>
                                <div className="player-stats-col col3">
                                    RPG: {(Math.round(player['REB'] / player['GP'] * 100) / 100).toFixed(2)}
                                </div>
                            </div>
                            <div className="more-info">
                                <div className="more-info-col">
                                    Season:<br></br>2021/22
                                </div>
                                <div className="more-info-col">
                                    FG%:<br></br>{Math.round(player['FG_PCT'] * 10000) / 100 + '%'}
                                </div>
                                <div className="more-info-col">
                                    FG3%:<br></br>{Math.round(player['FG3_PCT'] * 10000) / 100 + '%'}
                                </div>
                                <div className="more-info-col">
                                    FT%:<br></br>{Math.round(player['FT_PCT'] * 10000) / 100 + '%'}
                                </div>
                            </div>
                        </div>
                        
                        <div className="teaminfo-col">
                            <img className="team-logo" src={'https://cdn.nba.com/logos/nba/' + teamid + '/global/L/logo.svg'}/> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return <Loading message={"Loading data"} />
}