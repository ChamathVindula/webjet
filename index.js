require('dotenv').config();
const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const passport = require('./auth/passport');
const expressSession = require('express-session');
const ensurelogin = require('connect-ensure-login');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressSession({ secret: process.env.SESSIONSECRET, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render('login.ejs');
});

app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.send('<p>Logged In</p><a href="/second">Go to Second Page</a>')
});

app.get('/auth/google', passport.authenticate('google', { scope: ["profile", "email"] }));


app.get('/second', ensurelogin.ensureLoggedIn('/'), (req, res) => {
    console.log('req.user: ', req.user);
    res.send('<h1>You have been successfully reached the second page!</h1>')
});

app.listen(port, () => {
    console.log('Server listening on port 3000...')
})