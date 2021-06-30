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
    console.log(profile);
    process.nextTick(function () {
      pool.getConnection(function (err, connection) {
        connection.query("SELECT * from member where user_id=" + profile.id, function (err, rows, fields) {
          if (err) throw err;
          if (rows.length === 0) {
            connection.query("INSERT into member(user_id,user_name,user_group,user_img) VALUES('" + profile.id + "','" + profile.displayName + "','" + 'google' +  "','" + profile.picture + "')");
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
    clientID: "966046294128930",
    clientSecret: "6e414403239381579262f732a7f84db3",
    callbackURL: '/auth/facebook/callback',
    scope: ['public_profile', 'picture'],
    profileFields: ['id', 'displayName'],
    passReqToCallback: true
  }, function (request, response, accessToken, refreshToken, profile, done) {
    console.log(profile);
    profile.picture = 'https://graph.facebook.com/v2.4/' + profile.id + '/picture?type=large';
    process.nextTick(function () {
      pool.getConnection(function (err, connection) {
        connection.query("SELECT * from member where user_id=" + profile.id, function (err, rows, fields) {
        if (err) throw err;
        if (rows.length === 0) {
          connection.query("INSERT into member(user_id,user_name,user_group,user_img) VALUES('" + profile.id + "','" + profile.displayName + "','" + 'facebook' +  "','" + profile.picture + "')");
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
