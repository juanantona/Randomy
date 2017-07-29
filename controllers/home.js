'use strict'

// Interface functions
// **************************************************************************************************************
let show_home = (req, res) => { 
	if (req.session.user) {
    res.locals.user    = req.session.user.name
    res.locals.members = db.members
    res.render('home', { title:'This is the way!' })
  }
  else res.redirect('/login')  
}

// Module interface
// **************************************************************************************************************
exports.show_home = show_home







