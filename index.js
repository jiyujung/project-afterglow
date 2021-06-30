const express   = require('express');
const app = express();
const path = require('path')
const passport  = require('passport');
const session   = require('express-session');
const bodyParser = require("body-parser");
const MySQLStore = require('express-mysql-session')(session);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'asadlfkj!@#!@#dfgasdg', resave: false, saveUninitialized:true}));

const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'mysql',
  database: 'afterglow'
};

const sessionStore = new MySQLStore(options);

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Routes
app.use('/', require('./routes/main'));
app.use('/auth', require('./routes/auth'));
app.use('/fragrance', require('./routes/fragrance'));
app.use('/bathandbody', require('./routes/bathandbody'));
app.use('/homefragrance', require('./routes/homefragrance'));
app.use('/review', require('./routes/review'));

// Port setting
const port = 3000;
app.listen(port, function(){
  console.log(`server on! http://localhost:${port}`);
});