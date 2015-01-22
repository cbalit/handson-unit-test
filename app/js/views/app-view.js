/*global Backbone, jQuery, _, ENTER_KEY */
if(handson == undefined){
	var handson = {};
}

(function ($) {
	'use strict';

	// The Application
	// ---------------
	handson.AppView = Backbone.View.extend({
		el: '#userapp',
		userTemplate: null,

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'click #filter-button': 'filter',
			'keyup #filter-input': 'filter',
			'change #filter-input': 'filter'
		},

		initialize: function () {
            if($('#user-template')){
                this.userTemplate=_.template($('#user-template').html());
            }
			this.$input = this.$('#filter-input');
			this.$list = $('#users');
			this.$tbody=this.$list.find('tbody');
			this.render();
		},
		render: function () {
			this.$tbody.html('');
			handson.users.each(this.addOne, this);
		},
		addOne: function (user) {
			console.log('add a user:'+user.get('firstname'));
			this.$tbody.append(this.userTemplate(user.attributes));
		},
		filter: function () {
			var value=this.$input.val();
			if(!value){
				handson.users.restore();
			}
			else {
				handson.users.filterByName(value);
			}
			this.render();
		}
	});
})(jQuery);
