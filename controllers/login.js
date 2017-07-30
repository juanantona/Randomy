'use strict'

// External dependencies
// **************************************************************************************************************
const crypto = require( 'crypto' )

// Internal dependencies
// **************************************************************************************************************
const db = require( './../db.js' )

// Interface functions
// **************************************************************************************************************
let show_login = (req, res) => { 
	res.locals.message = req.session.message
	res.render('login', { title:'This is the way!' }) 
}

let login = (req, res) => { 
	authenticate(req.body.username, req.body.password, (err, user) => {
    if (user) {
      // Regenerate session when signing in to prevent fixation
      req.session.regenerate(() => {
        // Store the user's primary key in the session store to be retrieved, or in this case the entire user object
        req.session.user = user;
        req.session.message = 'Succes! Authenticated as ' + user.name
        res.redirect('/');
      });
    } else {
      req.session.message = 'Authentication failed, please check your username and password.'
      res.redirect('/login');
    }
  });
}

let logout = (req, res) => {
	// destroy the user's session to log them out will be re-created next request
  req.session.destroy(function() {
    res.redirect('/login');
  });
}

let setHashedPassword = (name, password) => {
	var user = getUser(name)
	user.password = hashPassword(password)
}

// Privte fuctions
// **************************************************************************************************************
let authenticate = (name, pass, callback) => {
  if (!module.parent) console.log('authenticating %s:%s', name, pass)
  var user = getUser(name)
  // query the db for the given username
  if (!user) return callback(new Error('cannot find user'))
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we found the user
  if (hashPassword(pass) == user.password) return callback(null, user)
  else callback(new Error('wrong password'))
}

let getUser = (name) => {
	var user;
	db.users.forEach( (db_user) => { 
		if (db_user.name === name) user = db_user
	})
	return user
}

let hashPassword = (password) => {
  var hashKey = 'S3KRE7'
  var passwordHash = crypto.createHash('md5').update(password + hashKey).digest('hex');
  return passwordHash;
};

// Module interface
// **************************************************************************************************************
exports.show_login        = show_login
exports.login             = login
exports.logout            = logout
exports.setHashedPassword = setHashedPassword






