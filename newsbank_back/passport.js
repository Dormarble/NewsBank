import passport from 'passport';
import passportLocal from 'passport-local'
const LocalStorage = passportLocal.Strategy;
import User from './models/users.js';

export default () => {
    passport.use(new LocalStorage(
        {
            usernameField: 'id',
            passwordField: 'pw'
        },
        async (username, password, done) => {
            try {
                const user = await User.findOne()
                .where('uid').equals(username);
                
                if(!user) {
                    return done(null, false, {message: 'there is no user'});
                }
                if (user.pw === password) {    
                    return done(null, user, {message: 'sign in successfully'});
                } else {
                    return done(null, user, {message: 'password does not match'});
                }
            } catch(err) {
                return done(err);
            }
        }
    ));
    
    passport.serializeUser((user, done) => {
        return done(null, user.uid);
    });
    
    passport.deserializeUser(async (id, done) => {
        const user = await User.findOne().where('uid').equals(id);
        return done(null, user);    
    });
}