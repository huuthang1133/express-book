var express = require('express');
var router = express.Router();

var shortid = require('shortid');
var db = require('../db');

var users = db.get('users').value();

router.get('/',(req,res) =>{
  res.render('users/index.pug', {
    users: users
  });
});

router.get('/create', function(req,res){
  res.render('users/create.pug')
});

router.post('/create', function(req,res){
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users');
});

router.get('/update', function(req,res){
  res.render('users/update.pug', {
    users: users
  });
});

router.get('/update/:id', function(req,res){
  var id = req.params.id;
  var user = db.get('users').find({id: id}).value();
  res.render('users/view.pug',{
    user: user
  });
});

router.post('/update/:id', function(req,res){
  var id = req.params.id;
  var data = req.body;
  if (!data.name) {
    data.name = db.get('users').find({id: id}).value().name;
  }
  db.get('users')
    .find({ id: id })
    .assign({ name: data.name, book: data.book})
    .write()
  res.redirect('/users');
  res.render('index.pug',{
    users: users
  })  
});

router.get('/delete/:id', function(req,res){    
  var id = req.params.id;
  db.get('users')
  .remove({ id: id })
  .write()
  res.redirect('/users');
  res.render('index.pug',{
    users: users
  })
});

module.exports = router;