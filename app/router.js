App.Router.map(function() {

	this.route('login');
	this.route('logout');

	this.resource('articles', { path: '/blog' }, function() {
		this.route('show', {path: '/:slug'});
	});

	this.resource('portfolio', function() {
		this.route('show', {path: '/:slug'});
	});
	
});

App.Router.reopen({location: 'history'});

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