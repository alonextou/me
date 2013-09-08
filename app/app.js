var debug = {
	LOG_TRANSITIONS: true,
	LOG_TRANSITIONS_INTERNAL: true,
	LOG_VIEW_LOOKUPS: true,
	LOG_ACTIVE_GENERATION: true,
	LOG_BINDINGS: true,
	RAISE_ON_DEPRECATION: true,
	LOG_STACKTRACE_ON_DEPRECATION: true	
}

var App = window.App = Ember.Application.create({

});

require('routes/**/*');
require('controllers/**/*');
require('models/**/*');
require('views/**/*');
require('helpers/**/*');
require('router');