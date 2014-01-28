'use strict';

module.exports = function(mean) {
	/*
		Register the unique module name and indicate its dependencies
	*/

	mean.register('404', function(app, auth, database, middleware) {
		
		middleware.add('after', 999, function(req, res, next) {
			return res.redirect('#!/404');
		});
	});

	mean.ready({
		name: '404',
	});
};