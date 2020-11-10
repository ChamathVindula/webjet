require('dotenv').config();
const path = require('path');
const http = require('http');
const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const Socket = require('./utils/socket.io');
const passport = require('./auth/passport');
const expressSession = require('express-session');
const ensurelogin = require('connect-ensure-login');
const redisStore = require('./utils/redis')(expressSession);

const app = express();
const server = http.createServer(app);

const socket = new Socket(server, redisStore);
require('./utils/socketListners')(socket.getIo());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressSession({ 
    store: redisStore,
    secret: process.env.SESSIONSECRET, 
    resave: false, 
    saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);

app.get('/', (req, res) => {
    res.render('login.ejs');
});

app.get('/chat', ensurelogin.ensureLoggedIn('/'), (req, res) => {
    res.render('chat.ejs', { user: req.user });
});

server.listen(port, () => {
    console.log('Server listening on port 3000...')
})
