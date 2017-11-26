let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Home', user: req.user });
});

/* GET about page. */
router.get('/about', function (req, res) {
  res.render('about', { title: 'About', user: req.user });
});

/* GET contact page. */
router.get('/contact', function (req, res) {
  res.render('contact', { title: 'Contact', user: req.user });
});

/* GET profile page. */
router.get('/profile', function (req, res) {
  if(req.user) {
    res.render('profile', { title: 'Profile', user: req.user });
  } else {
    res.redirect('/login', { title: 'Login' });
  }
});

/* GET login page. */
router.get('/login', function (req, res) {
  res.render('login', { title: 'Login', user: req.user });
});

module.exports = router;
