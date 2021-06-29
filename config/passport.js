const passport = require('passport');
const pool = require('../routes/db.js');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy(
  {
    clientID: "683854711500-pd4725f8q4rtnum1qfff7hmod2dhia80.apps.googleusercontent.com",
    clientSecret: "CTjCaBmhJZQylf30fXLsGKbB",
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
  }, function (request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      pool.getConnection(function (err, connection) {
        connection.query("SELECT * from member where user_id=" + profile.id, function (err, rows, fields) {
          if (err) throw err;
          if (rows.length === 0) {
            connection.query("INSERT into member(user_id,user_name,user_group) VALUES('" + profile.id + "','" + profile.displayName + "','" + 'google' + "')");
          } else {
            console.log("User already exists in database");
          }
          connection.release;
        });
        return done(null, profile);
    });
  });
}));

passport.use(new FacebookStrategy(
  {
    clientID: "211100520685336",
    clientSecret: "abb849349995ca0ee83655c2c4383a67",
    callbackURL: '/auth/facebook/callback',
    passReqToCallback: true
  }, function (request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      pool.getConnection(function (err, connection) {
        connection.query("SELECT * from member where user_id=" + profile.id, function (err, rows, fields) {
        if (err) throw err;
        if (rows.length === 0) {
          connection.query("INSERT into member(user_id,user_name,user_group) VALUES('" + profile.id + "','" + profile.displayName + "','" + 'facebook' + "')");
        }
        else {
          console.log("User already exists in database");
        }
        connection.release;
      });
      return done(null, profile);
    });
  });
}));

module.exports = passport;
