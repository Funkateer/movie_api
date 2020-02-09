/** @const mongoose represents the module 'mongoose'
* @const bcrypt represents the module 'bcrypis'
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var movieSchema = mongoose.Schema({
Title:         {type: String, required: true},
  Description: {type: String, required: true},
  Release: String,
  Genre: {
    Name: String,
    Bio:  String
  },
  Actors :  [String],
  ImagePath: String,
  Featured:  Boolean
});

var userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email:    {type: String, required: true},
  Birthday:  Date,
  FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

// hashing passwords
userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};
// compare and validate decrypted passwords
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
