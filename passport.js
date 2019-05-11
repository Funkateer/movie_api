const passport 			= require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT 	= require('passport-jwt');
const Models 				= require('./models.js');

var JWTStrategy = passportJWT.Strategy;
var ExtractJWT  = passportJWT.ExtractJwt;
var Users			  = Models.User;

passport.use(new LocalStrategy({
	usernameField: 'Username',
	passwordField: 'Password'
	}, (username, password, callback) => {
	console.log(username + '  ' + password);
	Users.findOne({ Username: username }, (error, user) => {
		if (error) {
			console.log(error);
			return callback(error);
		}
		if (!user) {
			console.log('incorrect username');
			return callback(null, false, {message: 'Incorrect username or password.'});
		}
		console.log('finished');
		return callback(null, user);
	});
}));

passport.use(new JWTStrategy({
jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
	return Users.findById(jwtPayload._id)
	.then((user) => {
		return callback(null, user);
	})
	.catch((error) => {
		return callback(error)
	});
}));
