var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config(); 
var mysql = require('mysql');
var mysqlconnection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "mysql",
    port: 3306,
    database: "afterglow"
  });
mysqlconnection.connect(function (err) {
  if (err) {
    console.log(err);
  }
});

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
      //Checking for user exists or not using profile.id
      mysqlconnection.query("SELECT * from member where user_id=" + profile.id, function (err, rows, fields) {
        if (err) throw err;
        if (rows.length === 0) {
          mysqlconnection.query("INSERT into member(user_id,user_name,user_group) VALUES('" + profile.id + "','" + profile.displayName + "','" + 'google' + "')");
        }
        else {
          console.log("User already exists in database");
        }
      });
      return done(null, profile);
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
      //Checking whether user exists or not using profile.id
      mysqlconnection.query("SELECT * from member where user_id=" + profile.id, function (err, rows, fields) {
        if (err) throw err;
        if (rows.length === 0) {
          mysqlconnection.query("INSERT into member(user_id,user_name,user_group) VALUES('" + profile.id + "','" + profile.displayName + "','" + 'facebook' + "')");
        }
        else {
          console.log("User already exists in database");
        }
      });
      return done(null, profile);
    });
  }));

module.exports = passport;
