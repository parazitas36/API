import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Loading } from '../Components/Loading';

const loginURL = 'http://192.168.1.101:8080/login';

export const Login = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLoginIn, setIsLoginIn] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);
    

    const doLogin = async (e) => {
        e.preventDefault();
        setIsLoginIn(true);

        const body = {
            "Username": username,
            "Password": password
        }

        try {
            const response = await fetch(loginURL, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                    'Accept-Encoding': 'gzip, deflate'
                },
                credentials: 'include'
            });
            if (response.status === 200) {
                setIsLoginIn(false);
                setRedirect(true);
            } else {
                setError('Username does not exist or password you have entered is incorrect.')
                setIsLoginIn(false);
            }
        }
        catch (e) {
            setError('ERROR! Please try again.')
            setIsLoginIn(false);
        }
    }

    if (redirect) {
        navigate('/main');
    }

    return !isLoginIn ? (
        <form className='loginForm' onSubmit={(e) => doLogin(e)}>
            <div className='loginHeader'>
                <div>Login</div>
                {error !== null && <div className='error'>{error}</div>}
            </div>
            <div className='loginFormInputs'>
                <input className='loginFormInput' id='loginUsername' type='text' onChange={(e) => setUsername(e.target.value)} placeholder='Enter your username' required />
                <input className='loginFormInput' id='loginPassword' type='password' onChange={(e) => setPassword((e.target.value))} placeholder='Enter your password' required />
                <center><input className='loginFormInput' id='submitBtn' type='submit' value='Sign In' /></center>
            </div>

        </form>
    ) : (
        <Loading message={"Signing in"} />
    )
}
