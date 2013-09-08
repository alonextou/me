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