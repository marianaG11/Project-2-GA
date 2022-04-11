// Middleware for routes that require a logged in user
module.exports = function isLoggedIn(req, res, next) {
	// Pass the req/res to the next middleware/route handler
	if ( req.isAuthenticated() ) return next();
	// Redirect to login if the user is not already logged in
	//isAuthenticated method returns true or false if there is a currently logged in user 
	res.redirect('/auth/google');
  }