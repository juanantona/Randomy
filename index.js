const express = require('express')
const app     = express()

// Set template engine
const dust = require('consolidate').dust
app.engine('dust', dust)
app.set('view engine', 'dust')

// Routes
app.get('/', (req, res) => {
	res.redirect('/login')
})

app.get('/login', (req, res) => {
	res.render('index', {title:'This is the way!'})
})

// Server up
app.listen(3000, () => {
	console.log('App up on port 3000!')
})