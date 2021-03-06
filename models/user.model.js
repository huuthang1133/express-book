var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  book: String,
  id: String,
  email: String,
  password: String,
  avatarUrl: String,
  isAdmin: Boolean
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;