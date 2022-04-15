import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetData } from '../hooks/GetData';
import { Loading } from '../Components/Loading';
import { AppContext } from '../App';
import './table.css';

export const PlayersStats = () => {
    const [isLoading, fetchedData] = useGetData('http://192.168.1.101:8080/playerstats');

    // States
    const [currentPage, setCurrentPage] = useState(null);
    const [totalPages, setTotalPages] = useState(null);

    if (fetchedData && totalPages === null) {
        setTotalPages(fetchedData['data'].length / 15);
    }

    if (totalPages && currentPage === null) {
        setCurrentPage(1);
    }

    const { logged: [loggedIn, setLoggedIn], loggedHandler: [LoggedInHandler] } = useContext(AppContext);
    LoggedInHandler();
    const navigate = useNavigate();
    if (!loggedIn) { navigate("/login") }

    if (isLoading) {
        return <Loading message={"Loading data"} />
    } else {
        const data = fetchedData;
        if (data && currentPage && totalPages) {
            if (data['status'] === 401) {
                setTimeout(() => {
                    navigate('/login')
                }, 3000)
                return <div>Session has ended. You must to re-login to continue.</div>
            }
            const playersData = data['data'];
            return (
                <center>
                    <table className='customTable'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Team</th>
                                <th>Age</th>
                                <th>GP</th>
                                <th>W</th>
                                <th>L</th>
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
                                <th>BLKA</th>
                                <th>PF</th>
                                <th>PFD</th>
                                <th>PTS</th>
                                <th>+/-</th>
                                <th>DD</th>
                                <th>TD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                playersData.map((player, index) => {
                                    if (index >= (currentPage - 1) * 15 && index <= currentPage * 15) {
                                        return (<tr>
                                            <td>{player['PLAYER_NAME']}</td>
                                            <td>{player['TEAM_ABBREVIATION']}</td>
                                            <td>{player['AGE']}</td>
                                            <td>{player['GP']}</td>
                                            <td>{player['W']}</td>
                                            <td>{player['L']}</td>
                                            <td>{(Math.round(player['MIN'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(player['FGM'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(player['FGA'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{player['FG_PCT']}</td>
                                            <td>{(Math.round(player['FG3M'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(player['FG3A'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{player['FG3_PCT']}</td>
                                            <td>{(Math.round(player['FTM'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(player['FTA'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{player['FT_PCT']}</td>
                                            <td>{(Math.round(player['OREB'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(player['DREB'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(player['REB'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(player['AST'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(player['TOV'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(player['STL'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(player['BLK'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(player['BLKA'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(player['PF'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(player['PFD'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(player['PTS'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{(Math.round(player['PLUS_MINUS'] / player['GP'] * 100) / 100).toFixed(2)}</td>
                                            <td>{player['DD2']}</td>
                                            <td>{player['TD3']}</td>
                                        </tr>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>
                    <div className='pageselection'>
                        <button className="currentPageBtn" onClick={ () => {if(currentPage > 1) {setCurrentPage(currentPage - 1)}} }>-</button>
                        <input className='selectedpage' type='number' value={currentPage}
                        min={1} max={Math.round(totalPages) < totalPages ? Math.round(totalPages)+1 : Math.round(totalPages)} 
                        onChange={(e) => { if(e.target.value) { if(totalPages+1 < e.target.value) {setCurrentPage(currentPage);} else if(e.target.value < 1) {setCurrentPage(currentPage);} else {setCurrentPage(e.target.value);} }}} 
                        />
                        <button className="currentPageBtn" onClick={ () => {totalPages > currentPage ? setCurrentPage(Number(currentPage) + 1) : setCurrentPage(Math.round(currentPage))} }>+</button>
                        <span className='maxpage'> / {Math.round(totalPages) < totalPages ? Math.round(totalPages)+1 : Math.round(totalPages)}</span>
                    </div>
                </center>
            );
        }
        return (
            <Loading message={"Loading data"} />
        );
    }
}
