const express = require( 'express' )
const app     = express()

const is_production = process.env.NODE_ENV === 'production'

// Set template engine
const dust    = require( 'consolidate' ).dust
app.engine('dust', dust)
app.set('view engine', 'dust')

// Set port
app.set('port', (process.env.PORT || 3000))

// Session
const session    = require( 'express-session' )
const bodyParser = require( 'body-parser' )

app.use( bodyParser.urlencoded({ extended: false }))
app.use( session({
  resave            : false, // don't save session if unmodified
  saveUninitialized : false, // don't create session until something stored
  secret            : 's3cr3t'
}))

// Set static files folder
app.use(express.static('public'))

// Middleware
let middleware = require( './middleware/index.js' )
app.use( middleware.log )

// Controllers
let dashboard_controller = require('./controllers/dashboard.js')
let login_controller     = require('./controllers/login.js')

// Routes
app.get(  '/',       dashboard_controller.show_dashboard )
app.get(  '/login',  login_controller.show_login )
app.post( '/login',  login_controller.login )
app.get(  '/logout', login_controller.logout )

// DB server up
const MongoClient       = require('mongodb').MongoClient
const db_connection_url = (is_production)? process.env.MONGODB_URI : 'mongodb://127.0.0.1/randomy'

MongoClient.connect(db_connection_url, (err, client) => {
  if (err) return console.log(err)
  console.log('DB server connected succesfully')
  exports.db = client.db("randomy");
	// Server up
	app.listen(app.get('port'), () => {
		console.log('App server running on port', app.get('port'))
	})
})



