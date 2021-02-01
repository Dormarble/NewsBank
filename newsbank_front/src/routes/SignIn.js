import React from 'react';
import axios from 'axios';
import pbkdf2 from 'pbkdf2-password';
import './SignIn.css';

import { API_SERVER } from '../config.js';
import { setWithExpiry } from '../util/localStorage.js';
import { Redirect } from 'react-router-dom';

const resCode = {
    SUCCESS: 0,
    NO_USER: 1,
    PW_NOT_MATCH: 2,
    SERVER_ERR: 3
};

class SignIn extends React.Component {
    submit = async (e) => {
        e.preventDefault();
        const id = document.getElementById('sign_in_id').value;
        const pw = document.getElementById('sign_in_pw').value;

        const { data: { salt } } = await axios.post(`${API_SERVER}/signin/key`, {id: id});
        if (!salt) { alert('your id or password is incorrect');  return; }

        const hash = await getHash(pw, salt);

        let apiResCode, apiResMessage;
        try{
            let { data: {message, code} } = await axios.post(`${API_SERVER}/signin`, {id: id, pw: hash});
            apiResCode = code;
            apiResMessage = message;
        } catch {
            alert('username or password don\'t match');
            return;
        }
        console.log(apiResCode, apiResMessage);
        switch(apiResCode) {
            case resCode.SUCCESS:
                this.props.history.push('/');
                break;
            case resCode.NO_USER:
            case resCode.PW_NOT_MATCH:
                document.querySelector('.id_pw_unmatch').classList.remove('hide');
                break;
            case resCode.SERVER_ERR:
                alert('internal server error. please try again later');
                break;
        }
    }
    
    componentDidMount() {
        document.querySelector('.sign_in_form').addEventListener("submit", this.submit);
    }

    render() {
        return <div className="sign_in_content">
            <span className="sign_in_title">Sign in</span>
            <form className="sign_in_form">
                <input type="text" id="sign_in_id" placeholder="id" required />
                <input type="password" id="sign_in_pw" placeholder="password" required />
                <small className="id_pw_unmatch hide">id or password does not match</small>
                <input type="submit" id="sign_in_submit" value="Sign In" />
            </form>
        </div>;
    }
}

function getHash(pw, salt) {
    const hasher = pbkdf2();
    return new Promise((resolve, reject) => {
        hasher({password: pw, salt: salt}, (err, pw, salt, hash) => {
            if (err != null) { reject(err); }
            else { resolve(hash); }
        });
    })
}

export default SignIn;