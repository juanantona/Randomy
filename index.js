const express = require('express')
const app     = express()

// Set template engine
const dust = require('consolidate').dust
app.engine('dust', dust)
app.set('view engine', 'dust')

// Set port
app.set('port', (process.env.PORT || 3000))

// Middleware
const session    = require('express-session')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 's3cr3t'
}))

app.use(express.static('stylesheets'))

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
const db  = require('./db.js')
global.db = db

// Controllers
let home_controller  = require('./controllers/home.js')
let login_controller = require('./controllers/login.js')
login_controller.setHashedPassword('admin', '123')

// Routes
app.get(  '/',       home_controller.show_home )
app.get(  '/login',  login_controller.show_login )
app.post( '/login',  login_controller.login )
app.get(  '/logout', login_controller.logout )

// Server up
app.listen(app.get('port'), () => {
	console.log('App up on port', app.get('port'))
})