import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

import { getWithExpiry } from '../util/localStorage.js';

function Navigation() {
    const username = getWithExpiry('username');

    let usernameComponent;
    if (username) {
        usernameComponent = <span className="navigation_username">{username}</span>
    } else {
        usernameComponent = <Link to="/signin" className="link_signin">Sign In</Link>
    }

    return <div className='navigation_content'>
        <div className='navigation_menu'>
            <Link to='/' className='link_home'>Home</Link>
            <Link to='/economy' className='link_economy'>Economy</Link>
        </div>
        <div className="navigation_username_content">
            {usernameComponent}
        </div>
    </div>
}

export default Navigation