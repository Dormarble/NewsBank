import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return <div>
            <Link to="/signup" className="link_signup">Sign Up</Link>
            <Link to="/signout" className="link_signout">Sign Out</Link>
        </div>
    }
}

export default Home