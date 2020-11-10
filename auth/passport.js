const passport = require('passport');
const db = require('../models/index.js');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Setup the google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/auth/google/callback'
},(accessToken, refreshToken, profile, done) => {
    db.GoogleUsers.findOrCreate({ where: { id: profile.id }, defaults: { displayName: profile.displayName, email: profile.emails[0].value, photo: profile.photos[0].value }})
    .then(user => {
        return done(null, user);
    })
    .catch(err => { 
        console.log(err);
    });
}));

// Initialize passport for serializing and deserializing users to and from sessions
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    db.GoogleUsers.findOne({where:{id: user[0].id}})
    .then(record => {
        done(null, record);
    })
    .catch(err => {
        console.log(err)
    });
});

module.exports = passport;