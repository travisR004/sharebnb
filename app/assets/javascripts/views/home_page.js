window.Sharebnb.Views.HomePage = Backbone.View.extend({
	initialize: function(){
	},

	template: JST["home"],

	events: {
		"submit #travel-search": "executeSearch"
	},

	render: function(){
		var renderedContent = this.template()
		this.$el.html(renderedContent)
		this.$el.find(".date").datepicker({
			showOtherMonths: true,
      selectOtherMonths: true,
			autoclose: true
		});
		return this
	},

	executeSearch: function(event){
		event.preventDefault();
	}
})