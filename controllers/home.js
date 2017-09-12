'use strict'

// Interface functions
// **************************************************************************************************************
let show_home = (req, res) => { 
  const db = require( './../index.js' ).db
  
  if (req.session.user) {
    res.locals.user = req.session.user.name
    db.collection('members').find().toArray( (err, results) => {
    	res.locals.members = results
      res.render('home', { title:'This is the way!' })
    })
  }
  else res.redirect('/login')  
}

// Module interface
// **************************************************************************************************************
exports.show_home = show_home







