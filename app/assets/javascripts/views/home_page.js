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
		debugger
		if(this.$el.find("#city")){
			var autocomplete = new google.maps.places.Autocomplete(this.$el.find("#city")[0]);
		}
		return this
	},

	executeSearch: function(event){
		event.preventDefault();
	}
})