import React, { useContext } from 'react'
import { useGetData } from '../hooks/GetData';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../Components/Loading';
import { AppContext } from "../App";
import './table.css'

export const Teams = () => {
    const [isLoading, fetchedData] = useGetData('http://192.168.1.101:8080/teams');
    const { logged: [loggedIn, setLoggedIn], loggedHandler: [LoggedInHandler] } = useContext(AppContext);
    LoggedInHandler();
    const navigate = useNavigate();
    if ( !loggedIn ) { navigate("/login") }

    const ClickTeam = (e) => {
        e.preventDefault();
        const teamid = e.target.id;
        console.log(teamid)
        navigate('/teams/' + teamid)
    }

    if (isLoading) {
        return <Loading message={"Loading data"} />
    } else {
        const data = fetchedData;
        if (data) {
            if (data['status'] === 401) {
                setTimeout(() => {
                    navigate('/login')
                }, 3000)
                return <div>Session has ended. You must to re-login to continue.</div>
            }
            const teamsData = data['data'];
            return (
                <div className="wrapper">
                    <table className='customTable'>
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>City</th>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Conference</th>
                                <th>Division</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                teamsData.map((team) => {
                                    return (
                                        <tr>
                                            <td className='teamlogocol'><img alt={team['name']} id={team['id']} onClick={(e) => ClickTeam(e)} className='teamlogoimg' src={'https://cdn.nba.com/logos/nba/' + team['id'] + '/global/L/logo.svg'} width={'50px;'} /></td>
                                            <td>{team['city']}</td>
                                            <td>{team['code']}</td>
                                            <td>{team['name']}</td>
                                            <td>{team['conference']}</td>
                                            <td>{team['division']}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            );
        }
        return (
           <Loading message={"Loading data"} />
        );
    }
}
