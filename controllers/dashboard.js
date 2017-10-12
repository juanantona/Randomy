'use strict'

// Interface functions
// **************************************************************************************************************
let show_dashboard = (req, res) => { 
  const db = require( './../index.js' ).db
  
  if (req.session.user) {
    res.locals.user = req.session.user.name
    res.locals.people_each_group = Array.from({ length: 10 }, (v, k) => k+1); 

    db.collection('members').find().toArray( (err, members) => {
    	res.locals.members = members.sort( (f1, f2) => { return f1.name.localeCompare(f2.name) })
      res.render('dashboard', { title:'Randomy' })
    })
  }
  else res.redirect('/login')  
}

// Module interface
// **************************************************************************************************************
exports.show_dashboard = show_dashboard







