import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Loading } from '../Components/Loading';

const registerURL = 'http://192.168.1.101:8080/register';

export const Register = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [rpassword, setRPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const doRegister = async(e) => {
        e.preventDefault();

        if(rpassword !== password){
            setError('Both passwords must match! Please re-enter your passwords and try again.')
        }else{
            const body = {
                "Username": username,
                "Password": password
            }
    
            try {
                const response = await fetch(registerURL, {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                        'Accept-Encoding': 'gzip, deflate'
                    },
                    credentials: 'include'
                });
                if (response.status === 201) {
                    setIsLoading(false);
                    setRedirect(true);
                } else {
                    setError('User with the username you have entered already exists. Please try another one.')
                    setIsLoading(false);
                }
            }
            catch (e) {
                setError('ERROR! Please try again.')
                setIsLoading(false);
            }
        }
    }

    if(redirect){
        navigate('/login');
    }

    if (isLoading){
        return <Loading message={"Signing up"} />
    }

    return (
        <form className='registerForm' onSubmit={(e) => doRegister(e)}>
            <div className='registerHeader'>
                <div>Register</div>
                {error !== null && <div className='error'>{error}</div>}
            </div>
            <div className='registerFormInputs'>
                <input className='registerFormInput' id='registerUsername' type='text' onChange={(e) => setUsername(e.target.value)} placeholder='Enter your username' required />
                <input className='registerFormInput' id='registerPassword' type='password' onChange={(e) => setPassword((e.target.value))} placeholder='Enter your password' required />
                <input className='registerFormInput' id='registerPassword' type='password' onChange={(e) => setRPassword((e.target.value))} placeholder='Repeat your password' required />
                <center><input className='registerFormInput' id='submitBtn' type='submit' value='Sign Up' /></center>
            </div>
        </form>
    )
}
