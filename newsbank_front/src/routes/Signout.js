import React from 'react';
import axios from 'axios';
import { API_SERVER } from '../config';

class Signout extends React.Component{
    state = {
        email: "null",
        username: "null"
    }
    requestSignOut = async () => {
        const {data} = await axios.get(`${API_SERVER}/signout`);
        this.setState({email: data.email, username: data.username});
    };

    render() {
        return (
            <div>
                {this.state.username}
                {this.state.email}
            </div>);       
    }
}

export default Signout