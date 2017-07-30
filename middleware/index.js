'use strict'

// Interface functions
// **************************************************************************************************************
let log = (req, res, next) => {
  console.log(req.method, req.url, '- user: ', req.session.user)  
  next();
}

// Module interface
// **************************************************************************************************************
exports.log = log