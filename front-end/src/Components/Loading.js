import React from 'react';
import './Loading.css';

export const Loading = ({ message }) => {
  return (
      <div className='loading'>
        <div className='dotText'>{message}</div>
        <span className='dot'/>
      </div>
  )
}
