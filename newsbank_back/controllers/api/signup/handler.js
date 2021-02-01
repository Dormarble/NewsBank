import mongoose from 'mongoose';

import User from '../../../models/users.js';

const errCode = {
    INVALID_FORMAT: 0,
    DUP_USERNAME: 1,
    DUP_ID: 2,
    SERVER_ERR: 3
};

async function handler(req, res) {
    
    const uid = req.body.uid;
    const pw = req.body.pw;
    const salt = req.body.salt;
    const username = req.body.username;
    const email = req.body.email;
    let isAdmin = req.body.isAdmin;
    
    if (!(uid && pw && salt && username && email)) {
        return res.json({
            error: 'incorrect data format',
            code: errCode.INVALID_FORMAT
        });
    }
    if(!isAdmin) { isAdmin = false }

    let user = await User.findOne()
    .where('uid').equals(uid);
    if(user) { 
        return res.json({
            message: 'id already exists',
            code: errCode.DUP_ID
        })
    }
    user = await User.findOne()
    .where('username').equals(username);
    if(user) { 
        return res.json({
            message: 'username already exists',
            code: errCode.DUP_USERNAME
        })
    }

    const newUser = new User();
    console.log(newUser);
    newUser.uid = uid;
    newUser.pw = pw;
    newUser.salt = salt;
    newUser.username = username;
    newUser.email = email;
    newUser.isAdmin = isAdmin;
    console.log(newUser);
    try {
        await newUser.save();
        console.log(`new user(${username}) sign up!`);
        return res.status(200).json({
            message: 'enroll new user data successfully'
        })
    } catch(err) {
        console.log('Error: cannot insert new user into the database');
        console.log(err);
        return res.json({
            error: 'internal server error',
            code: errCode.SERVER_ERR
        });
    }
}

export default handler