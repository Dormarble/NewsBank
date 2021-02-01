import mongoose from 'mongoose';
import passport from 'passport';
// import User from '../../../models/users.js';

const resCode = {
    SUCCESS: 0,
    NO_USER: 1,
    PW_NOT_MATCH: 2,
    SERVER_ERR: 3
};

function handler(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            return res.json({
                error: 'internal server error',
                code: resCode.SERVER_ERR
            });
        }
        if(!user) {
            return res.json({
                error: 'username or password is wrong',
                code: resCode.NO_USER
            })
        }
        req.logIn(user, (err) => {
            if(err) {
                return res.json({
                    error: 'internal server error',
                    code: resCode.SERVER_ERR
                });
            }
            return res.json({
                message: 'sign in successfully',
                code: resCode.SUCCESS
            });
        })
    })(req, res, next);
}

/*
async function handler(req, res) {

    const user = await User.findOne()
    .where('uid').equals(req.body.id);

    if(!user) {
        return res.json({
            error: 'there is no user',
            code: code.NO_USER
        })
    }
    if (user.pw === req.body.pw) {
        req.session.isLogined = true;
        req.session.uid = user.uid;
        req.session.username = user.username;
        req.session.email = user.email;

        return res.json({
            message: 'sign in successfully',
            username: user.username,
            sessAge: 1000*60,
            code: code.SUCCESS
        })
    } else {
        return res.json({
            message: 'password does not match',
            code: code.PW_NOT_MATCH
        })
    }
}
*/

export default handler