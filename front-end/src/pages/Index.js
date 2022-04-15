import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

export const Index = () => {
  const { logged: [loggedIn, setLoggedIn] } = useContext(AppContext);
  
  return (
    <div className='index'>
      <div className='indextitle'>Welcome To The NBA Stats API !</div>
      <div ><h6>To continue You must to</h6></div>
      <Link className='indexlink' to="/login"><button id="linktologin">Login</button></Link>
      <div><h5>OR</h5></div>
      <Link className='indexlink' to="/register"><button id="linktoregister">Register</button></Link>
    </div>
  )
}
