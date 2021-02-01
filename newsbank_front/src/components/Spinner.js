import React from 'react';  
import './Spinner.css';

function Spinner() {
    return (
        <img src={process.env.PUBLIC_URL + '/image/spinner.png'} alt='spinner' className='spinner'/>
    )
}

export default Spinner
