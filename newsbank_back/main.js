import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessFS from 'session-file-store';
const fileStore = sessFS(session);
import passport from 'passport';
import LocalStorage from 'passport-local';

import Database from './database.js';
import loadKey from './loadKey.js';
import rootRouter from './routes/index.js';
import scrapeNews from './scraper/newsScraper.js';
import User from './models/users.js';
import passportConfig from './passport.js';

//load config.env
loadKey();

const app = express();
const port = process.env.PORT;
const DBKey = process.env.MONGO_DB;

// middlewares

// redirect HTTP to HTTPS 
// app.all('*', (req, res, next) => { 
//     let protocol = req.headers['x-forwarded-proto'] || req.protocol; 
    
//     if (protocol == 'https') { next(); } 
//     else { 
//         let from = `${protocol}://${req.hostname}${req.url}`;
//         let to = `https://'${req.hostname}${req.url}`; 
        
//         // log and redirect 
//         console.log(`[${req.method}]: ${from} -> ${to}`); 
//         res.redirect(to); 
//     } 
// });



app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: new fileStore(),
    cookie: {
        maxAge: 1000 * 60
    }
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

// route path
app.use('/', rootRouter);


// connect database
const db = new Database(DBKey);
if (!db.connect()) {
    console.log("shutdown server...");
    process.exit();
}

// start server
console.log("start server...");
app.listen(port, printStartMessage);

function printStartMessage() {
    console.log("server is started!");
    console.log("port: " + port);
}

scrapeNews(db); 
setInterval(() => { scrapeNews(db); }, 1000 * 60 * 5);

