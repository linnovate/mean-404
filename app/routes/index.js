'use strict';

module.exports = function(app) {
    
    // Home route
    var suggestions = require('../controllers/suggestions');
    app.get('/404/suggestions',suggestions.find);

};
