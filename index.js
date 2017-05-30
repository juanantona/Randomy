const express = require('express')
const app = express()

app.get('/', function(req, res) {
	res.send('This is the way!')
})

app.listen(3000, function(){
	console.log('App up on port 3000!')
})