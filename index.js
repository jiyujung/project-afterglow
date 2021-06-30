const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const session = require('express-session');
app.use(session({ secret: 'asadlfkj!@#!@#dfgasdg', resave: false, saveUninitialized: true }));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
// app.use('/user', require('./routes/user'));
app.use('/category', require('./routes/category'));
// app.use('/products', require('./routes/products'));

// Port setting
const port = 3001;
app.listen(port, function () {
  console.log(`server on! http://localhost:${port}`);
});