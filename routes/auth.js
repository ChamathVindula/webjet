const express = require('express');
const passport = require('../auth/passport');

const Router = express.Router();

Router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/chat');
});

Router.get('/auth/google', passport.authenticate('google', { scope: ["profile", "email"] }));

module.exports = Router;