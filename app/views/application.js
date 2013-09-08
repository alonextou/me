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