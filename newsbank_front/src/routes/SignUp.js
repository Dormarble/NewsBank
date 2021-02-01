import React from 'react';
import pbkdf2 from 'pbkdf2-password'
import axios from 'axios';
import './SignUp.css';

import { API_SERVER } from '../config.js';

const errCode = {
    INVALID_FORMAT: 0,
    DUP_USERNAME: 1,
    DUP_ID: 2,
    SERVER_ERR: 3
};

class SignUp extends React.Component {
    state = {
        id: "",
        pw: "",
        username: "",
        email: ""
    }

    constructor() {
        super();
    }

    onClick = async (e) => {
        e.preventDefault();
        let err = false;

        const id = document.getElementById('id').value;
        const pw = document.getElementById('pw').value;
        const pwCk = document.getElementById('pw_ck').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;

        document.getElementById('id_guide_incorrect').classList.add('hide');
        document.getElementById('id_guide_duplicate').classList.add('hide');
        document.getElementById('pw_guide').classList.add('hide');
        document.getElementById('pw_ck_guide').classList.add('hide');
        document.getElementById('username_guide_incorrect').classList.add('hide');
        document.getElementById('username_guide_duplicate').classList.add('hide');
        document.getElementById('email_guide').classList.add('hide');

        if (!isValidID(id)) {
            document.getElementById('id_guide_incorrect').classList.remove('hide');
            err = true;
        }
        if (!isValidPW(pw)) {
            document.getElementById('pw_guide').classList.remove('hide');
            err = true;
        }
        if (pw !== pwCk) {
            document.getElementById('pw_ck_guide').classList.remove('hide');
            err = true;
        }
        if (!isValidUsername(username)) {
            document.getElementById('username_guide_incorrect').classList.remove('hide');
            err = true;
        }
        const email_regex = /[0-9a-zA-Z]*@\S*[.][0-9a-zA-Z]*/;
        if (email_regex.exec(email) == null) {
            document.getElementById('email_guide').classList.remove('hide');
            err = true;
        } 

        if(err) { return; }

        const { salt, hash } = await crytoPassword(pw);
        const body = {
            uid: id,
            pw: hash,
            salt: salt,
            username: username,
            email: email,
            isAdmin: false
        };

        const { data } = await axios.post(`${API_SERVER}/signup`, body);
        if (data.error) { 
            switch(data.code) {
                case errCode.INVALID_FORMAT:
                    alert('request body error');
                    break;
                case errCode.DUP_ID:
                    document.getElementById('id_guide_duplicate').remove('hide');
                    break;
                case errCode.DUP_USERNAME:
                    document.getElementById('id_guide_incorrect').remove('hide');
                    break;
                case errCode.SERVER_ERR:
                    alert(data.error);
                    break;
            }                       
            return; 
        }

        alert(data.message);
    }

    render() {
        return (
            <div className="sign_up_content">
                <form className="sign_up_form">
                    <input type="text" id="id" placeholder="id" required />
                    <small id="id_guide_incorrect" className="guide hide">id must be combination of lowercase alphabets and numbers and be at least 8 characters</small>
                    <small id="id_guide_duplicate" className="guide hide">id already exists</small>
                    <input type="password" id="pw" placeholder="password" required />
                    <small id="pw_guide" className="guide hide">passwords must be combination of lowercase alphabets, numbers and special characters and be at least 9 characters</small>
                    <input type="password" id="pw_ck" placeholder="check password" required />
                    <small id="pw_ck_guide" className="guide hide">password must match</small>
                    <input type="text" id="username" placeholder="user name" required />
                    <small id="username_guide_incorrect" className="guide hide">user name must be at least 4 characters</small>
                    <small id="username_guide_duplicate" className="guide hide">user name already exists</small>
                    <input type="text" id="email" placeholder="E-mail" required />
                    <small id="email_guide" className="guide hide">invalid E-mail format</small>
                    <button onClick={this.onClick}>Sign Up</button>
                </form>
            </div>
        )
    }

}

function isValidID(id) {
    if (!(8 <= id.length && id.length <= 20)) { return false; }
    
    let alphabet = 0, number = 0;
    for (let i=0; i<id.length; i++) {
        const char = id.charAt(i);

        if ('a'<=char && char<='z') { alphabet++; }
        if ('0'<=char && char<='9') { number++; }
    }

    if (alphabet + number != id.length) { return false; }
    if (alphabet == 0 || number == 0) { return false; }

    return true;
}
function isValidPW(pw) {
    if (!(8 <= pw.length && pw.length <= 20)) { return false; }
    
    let alphabet = 0, number = 0, specialChar = 0;
    for (let i=0; i<pw.length; i++) {
        const char = pw.charAt(i);

        if ('a'<=char && char<='z') { alphabet++; }
        if ('0'<=char && char<='9') { number++; }
        if ('!@#$%^&*()'.includes(char)) { specialChar++; }
    }

    if (alphabet + number + specialChar != pw.length) { return false }
    if (alphabet == 0 || number == 0 || specialChar == 0) { return false }

    return true;
}
function isValidUsername(un) {
    const username = un.toLowerCase();
    if (!(4 <= username.length && username.length <= 15)) { return false; }
    
    let alphabet = 0, number = 0;
    for (let i=0; i<username.length; i++) {
        const char = username.charAt(i);

        if ('a'<=char && char<='z') { alphabet++; }
        if ('0'<=char && char<='9') { number++; }
    }

    if (alphabet + number != username.length) { return false }

    return true;
}

function crytoPassword(pw) {
    const hasher = pbkdf2();
    return new Promise((resolve, reject) => {
        hasher({password: pw}, function(err, password, salt, hash) {
            if (err) {
                console.log(err);
                alert('fail to create account');
                reject(err);
            }
            resolve({ 
                salt: salt,
                hash: hash
            });
        });

    })
}

export default SignUp