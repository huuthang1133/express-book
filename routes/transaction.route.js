var express = require('express');
var router = express.Router();

var shortid = require('shortid');
var db = require('../db');

var trans = db.get('transactions').value();

router.get('/', function (req,res) {
  res.render('transaction/index.pug',{
    trans: trans    
  });
});

router.get('/create', function (req,res) {
  var books = db.get('books').value();
  var users = db.get('users').value();
  res.render('transaction/view.pug',{
    books: books,
    users: users
  });
});

module.exports = router;