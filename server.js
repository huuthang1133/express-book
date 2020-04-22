// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");
var app = express();
var db = require('./db');

var bookRoute = require('./routes/book.route');

var userRoute = require('./routes/user.route');

var transRoute = require('./routes/transaction.route');

// our default array of dreams

app.set('views', './views'); 
app.set('view engine', 'pug');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.send('Welcome to my library');
});


app.use('/users', userRoute);

app.use('/books', bookRoute);

app.use('/transactions', transRoute);



// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
