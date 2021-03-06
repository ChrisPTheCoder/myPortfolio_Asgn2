/*
  File name: index.js
  Author's name: Phuong Linh Pham
  StudentID: 300923800
  Web App name: comp308_asign2
*/

// Modules required for routing
var express = require('express');
var router = express.Router();

// Module for MongoDB
let mongoose = require('mongoose');

// module required for authentication
let passport = require('passport');

// Defining the user model
let UserModel = require('../models/users');
let User = UserModel.User; // Alias for User Model - User object

// define the contacts model
let contact = require('../models/contacts');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('content/index', { 
    title: 'Home',
    contacts: '',
    userName: req.user ? req.user.username: ''
  });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('content/about', { 
    title: 'About',
    contacts: '',
    userName: req.user ? req.user.username: ''
  });
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('content/projects', { 
    title: 'Projects',
    contacts: '',
    userName: req.user ? req.user.username: '',
    project_dragonslayer: 'Created 2D top-down shooting game with 3 stages and different levels',
    project_moviemaniac: 'A web app of user’s movie collection that allows the user to review, rent and buy cinema movies or add to their collections',
    project_worldcuisine: 'Implemented APIs that manages restaurants, cuisines, tables, orders to satisfy customer’s request  &	Published in Amazon Web Service with RDS and managed an API with APIGee management platform'
  });
});

/* GET services page. */
router.get('/services', function(req, res, next) {
  res.render('content/services', { 
    title: 'Services',
    contacts: '',
    userName: req.user ? req.user.username: ''
  });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('content/contact', { 
    title: 'Contact',
    contacts: '',
    userName: req.user ? req.user.username: ''
  });
});

// GET /login - render the login view
router.get('/login', (req, res, next)=>{
  // check to see if the user is not already logged in
  if(!req.user) {
    // render the login page
    res.render('auth/login', {
      title: "Login",
      contacts: '',
      messages: req.flash('loginMessage'),
      userName: req.user ? req.user.username : ''
    });
    return;
  } else {
    return res.redirect('/businessContact'); // redirect to businessContact
  }
});

// POST /login - process the login attempt
router.post('/login', passport.authenticate('local', {
  successRedirect: '/businessContact',
  failureRedirect: '/login',
  failureFlash: 'bad login'
}));

// GET /register - render the registration view
router.get('/register', (req, res, next)=>{
   // check to see if the user is not already logged in
  if(!req.user) {
    // render the registration page
      res.render('auth/register', {
      title: "Register",
      messages: req.flash('registerMessage'),
    });
    return;
  } else {
    return res.redirect('/businessContact'); // redirect to businessContact
  }
});

// POST / register - process the registration submission
router.post('/register', (req, res, next)=>{
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email
    }),
    req.body.password,
    (err) => {
      if(err) {
        console.log('Error creating a new user');
        if(err.name == "UserExistsError") {
          req.flash('registerMessage', 'Registration Error: User Already Exists');
        }
        return res.render('auth/register', {
          title: "Register",
          messages: req.flash('registerMessage'),
        });
      }
      // if registration is successful
      return passport.authenticate('local')(req, res, ()=>{
        res.redirect('/businessContact');
      });
    });
});



// GET /logout - process the logout request
router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/'); // redirect to the home page
});

module.exports = router;
