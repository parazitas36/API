import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { Loading } from '../Components/Loading';

export const Logout = () => {
    const { logged: [loggedIn, setLoggedIn]} = useContext(AppContext);
    const navigate = useNavigate();

    if(!loggedIn){
        navigate("/login");
    }

    useEffect(() => {
        document.cookie = 'loggedin=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
        setLoggedIn(false);
    }, [])

    return <Loading message={"Logging out"}/>
}
