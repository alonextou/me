App.Router.map(function() {

	this.route('login');
	this.route('logout');

	this.route('contact');

	this.resource('articles', { path: '/blog' }, function() {
		this.route('show', {path: '/:slug'});
	});

	this.resource('portfolio', function() {
		this.route('show', {path: '/:slug'});
	});
	
});

/* Use history API with fallback compatibility */
if (window.history && window.history.pushState) {
	if(window.location.hash) {
		var hash = window.location.hash.replace('#', '');
		location.href = 'http://' + window.location.host + hash;
	}
	App.Router.reopen({location: 'history'});
} else {
	if(!window.location.hash) {
		var path = '/#' + window.location.pathname;
		location.href = 'http://' + window.location.host + path;
	}
}

App.ApplicationRoute = Ember.Route.extend({
	actions: {
		willTransition: function(transition) {
			var self = this;
			transition.then(function(){
				self.controllerFor('application').transitionScroll();
			})
		}
	}
});

App.ContactRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render('contact/index');
	}
});