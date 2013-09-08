(function() {

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


})();

(function() {

App.ApplicationController = Ember.Controller.extend({
	scrollPos: 0,
	observePath: function() {
		/* set height before transitioning, for smooth scroll */
		var height = $('#application').height();
		$('#application').height(height);
		/* set default scroll position for screen resizing */
		if (this.get('currentPath') !== 'index') {
			this.set('scrollPos', 264);
		} else {
			this.set('scrollPos', 0);
		}
	}.observes('currentPath'),
	transitionScroll: function() {
		/* scroll animations */
		if (this.get('currentPath') !== 'index') {
			$('#content').css('min-height', $(window).height() - 200);
			$('html, body').animate({ scrollTop: 264 }, 300, 'easeOutBounce', function(){
				$('#application').css('height', 'auto');
			});
		} else {
			$('#content').css('min-height', 'inherit');
			$('html, body').animate({ scrollTop: 0 }, 300, 'easeOutBounce', function(){
				$('#application').css('height', 'auto');
			});
		}
	}
});

})();

(function() {

App.ApplicationView = Ember.View.extend({
	elementId: 'application',
	didInsertElement: function() {
		this.controller.transitionScroll();
		var self = this;
		var height = $('#application').height();
		/* prevent page from scrolling up on screen resize */
		$(window).resize(function() {
			$('#content').css('min-height', $(window).height() - 200);	
			var newScrollPos = $(window).scrollTop();
			var oldScrollPos = self.controller.get('scrollPos');
			if (newScrollPos < oldScrollPos) {
				$(window).scrollTop(self.controller.get('scrollPos'));
			}
		});
		/* sticky nav bar */
		$('#menu-affix').affix({
			offset: {
				top: 264
			}
		});
    }
});

})();

(function() {

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

})();