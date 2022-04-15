import React, { useState, useContext } from 'react'
import { useGetDataById } from '../hooks/GetDataById';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../Components/Loading';
import { AppContext } from '../App';
import './table.css'

const personSvg = (id) => {
    return (<svg id={id} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="personSvg" viewBox="0 0 16 16">
        <path id={id} d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>);
};

export const Team = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const { teamid } = useParams();
    
    const { logged: [loggedIn, setLoggedIn], loggedHandler: [LoggedInHandler] } = useContext(AppContext);
    LoggedInHandler();
    const navigate = useNavigate();
    if ( !loggedIn ) { navigate("/login") }

    useGetDataById('http://192.168.1.101:8080/teams/', teamid, { setIsLoading, setData });

    const showPlayer = (e) => {
        e.preventDefault();
        const playerid = e.target.id;
        navigate('/teams/' + teamid + '/players/' + playerid)
    }

    if (isLoading) {
        return <Loading message={"Loading data"} />
    } else {
        if (data) {
            if (data['status'] == 401) {
                setTimeout(() => {
                    navigate('/login')
                }, 3000)
                return <div>Session has ended. You must to re-login to continue.</div>
            }
            const playersData = data['data'];
            return (
                <div className="wrapper">
                    <table className='customTable'>
                        <thead>
                            <tr>
                                <th>More Info</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>GP</th>
                                <th>MIN</th>
                                <th>FGM</th>
                                <th>FGA</th>
                                <th>FG_PCT</th>
                                <th>FG3</th>
                                <th>FG3A</th>
                                <th>FG3_PCT</th>
                                <th>FTM</th>
                                <th>FTA</th>
                                <th>FT_PCT</th>
                                <th>OREB</th>
                                <th>DREB</th>
                                <th>REB</th>
                                <th>AST</th>
                                <th>TOV</th>
                                <th>STL</th>
                                <th>BLK</th>
                                <th>PF</th>
                                <th>PTS</th>
                                <th>+/-</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                playersData.map((player) => {
                                    return (<tr>
                                        <td><button className='showplayerbtn' id={player['PLAYER_ID']} onClick={(e) => showPlayer(e)}>{ personSvg(player['PLAYER_ID']) }</button></td>
                                        <td>{player['PLAYER_NAME']}</td>
                                        <td>{player['AGE']}</td>
                                        <td>{player['GP']}</td>
                                        <td>{(Math.round(player['MIN'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                        <td>{(Math.round(player['FGM'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                        <td>{(Math.round(player['FGA'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                        <td>{Math.round(player['FG_PCT'] * 10000) / 100 + '%'}</td>
                                        <td>{(Math.round(player['FG3M'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                        <td>{(Math.round(player['FG3A'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                        <td>{Math.round(player['FG3_PCT'] * 10000) / 100 + '%'}</td>
                                        <td>{(Math.round(player['FTM'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                        <td>{(Math.round(player['FTA'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                        <td>{Math.round(player['FT_PCT'] * 10000) / 100 + '%'}</td>
                                        <td>{(Math.round(player['OREB'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                        <td>{(Math.round(player['DREB'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                        <td>{(Math.round(player['REB'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                        <td>{(Math.round(player['AST'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                        <td>{(Math.round(player['TOV'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                        <td>{(Math.round(player['STL'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                        <td>{(Math.round(player['BLK'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                        <td>{(Math.round(player['PF'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                        <td>{(Math.round(player['PTS'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                        <td>{(Math.round(player['PLUS_MINUS'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            );
        }
        return <Loading message={"Loading data"} />
    }
}
