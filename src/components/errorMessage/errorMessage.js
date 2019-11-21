import React from 'react';
import './errorMessage.css';
import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <>
            <img src={img} alt='error' className='error'></img>
            <span>Something goes wrong</span>
        </>
    )
}

export default ErrorMessage;