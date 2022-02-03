// Admin is supposed to run after authentication
// Authentication creates req.user
// Admin can extract the relevant information from req.user
function admin(req, res, next) {
	console.log(req.user);
	// 401 Unauthorized -> access a resource without providing a valid JWT
	// 403 Forbidden -> Received the JWT, but the content does not allow the user to access the resource
	if (!req.user.isAdmin) return res.status(403).send('Access Denied');
	next();
}

module.exports = admin;
