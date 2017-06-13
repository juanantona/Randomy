const express = require('express')
const app     = express()

// Set template engine
const dust = require('consolidate').dust
app.engine('dust', dust)
app.set('view engine', 'dust')

// Middleware
const session    = require('express-session');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 's3cr3t'
}))

// Session-persisted message middleware
app.use((req, res, next) => {
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = err
  if (msg) res.locals.message = msg
  console.log('user: ', req.session.user)  
  next();
});

// DB
const crypto  = require('crypto');

var hashPassword = (password) => {
  var hashKey = 'S3KRE7'
  var passwordHash = crypto.createHash('md5').update(password + hashKey).digest('hex');
  return passwordHash;
};

var users = { admin: { name: 'admin' } }
users.admin.pwd = hashPassword('123456')

// Authenticate
var authenticate = (name, pass, callback) => {
  if (!module.parent) console.log('authenticating %s:%s', name, pass)
  var user = users[name]
  // query the db for the given username
  if (!user) return callback(new Error('cannot find user'))
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  if (hashPassword(pass) == user.pwd) return callback(null, user)
  else callback(new Error('wrong password'))
}

// Routes
app.get('/', (req, res) => {
	if (req.session.user) {
    res.locals.user = req.session.user.name
    res.render('home', { title:'This is the way!' })
  }
  else res.redirect('/login')  
})

app.get('/login', (req, res) => {
	res.render('login', { title:'This is the way!' })
})

app.post('/login', (req, res) => {
  authenticate(req.body.username, req.body.password, (err, user) => {
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(() => {
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success = 'Succes! Authenticated as ' + user.name
        res.redirect('/');
      });
    } else {
      req.session.error = 'Authentication failed, please check your username and password.'
      res.redirect('/login');
    }
  });
});

app.get('/logout', (req, res) => {
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/login');
  });
});

// Server up
app.listen(3000, () => {
	console.log('App up on port 3000!')
})