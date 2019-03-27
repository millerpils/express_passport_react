/* EXPRESS SETUP */

  const express = require('express');
  const path = require('path');
  const app = express();
  const cookieSession = require('cookie-session');
  const passport = require('passport');
  const GitHubStrategy = require('passport-github').Strategy;
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  const port = process.env.PORT || 8080;
  let loggedInUser = null;

  /* LOCAL SERVER SETUP */

  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/', (req, res) => res.sendFile('index.html', { root : __dirname}));
  app.listen(port , () => console.log('App listening on port ' + port));

  /*  PASSPORT SETUP  */

  app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: ['randomstringhere']
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, cb) {
    loggedInUser = user
    //console.log(loggedInUser)
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

/*  GITHUB AUTH  */

  const GITHUB_CLIENT_ID = "Iv1.2c871e9b82527871"
  const GITHUB_CLIENT_SECRET = "f1022f3b56463900febf0b4484af52e66093924c";

  passport.use(new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  ));

/* GOOGLE AUTH */

  const GOOGLE_CLIENT_ID = "106710008963-m33jv1tsp738hpu6jdr0hhb73auohf3e.apps.googleusercontent.com"
  const GOOGLE_CLIENT_SECRET = "VG7WZdJXfNFrAZfQ80C7H52W"

  passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  ));

/* ROUTES */

  app.get('/auth/git', passport.authenticate('github'));
  app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
    });

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

  app.get('/logout', function (req, res){
    req.logOut(); 
    req.session = null; 
    loggedInUser = null;
    res.redirect('/'); 
  });

  app.get('/get-user', (req, res) => {
    res.send(loggedInUser);
  });

  app.get('/error', (req, res) => res.send("Error logging in - please try again later"));

  