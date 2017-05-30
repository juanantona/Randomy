const express = require('express')
const app = express()

const dust = require('consolidate').dust
app.engine('dust', dust)
app.set('view engine', 'dust')

app.get('/', function(req, res) {
	res.render('index', { title : 'This is the way!' })
})

app.listen(3000, function(){
	console.log('App up on port 3000!')
})