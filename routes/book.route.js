var express = require('express');
var router = express.Router();

var shortid = require('shortid');
var db = require('../db');

var books = db.get('books').value();

router.get('/',(req,res) =>{
  res.render('index.pug', {
    books: books
  });
});

router.get('/search', function(req,res){
  var q = req.query.q;
  var matchedbook = books.filter(function(book){
    return book.text.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('index.pug', {
    books: matchedbook
  });
});

router.get('/create', function(req,res){
  res.render('create.pug')
});

router.get('/update', function(req,res){
  res.render('books/update.pug', {
    books: books
  });
});

router.get('/update/:id', function(req,res){
  var id = req.params.id;
  var book = db.get('books').find({id: id}).value();
  res.render('books/view.pug',{
    book: book
  });
});

router.post('/update/:id', function(req,res){
  var id = req.params.id;
  var newTitle = req.body.title;
  db.get('books')
    .find({ id: id })
    .assign({ title: newTitle})
    .write()
  res.redirect('');
  res.render('index.pug',{
    books: books
  })  
})

router.get('/delete/:id', function(req,res){    
  var id = req.params.id;
  db.get('books')
  .remove({ id: id })
  .write()
  res.redirect('/books');
  res.render('index.pug',{
    books: books
  })
})


router.post('/create', function(req,res){
  req.body.id = shortid.generate();
  db.get('books').push(req.body).write();
  res.redirect('/books');
});

module.exports = router;
