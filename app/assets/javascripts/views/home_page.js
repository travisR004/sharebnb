window.Sharebnb.Views.HomePage = Backbone.View.extend({
	initialize: function(){
	},

	template: JST["home"],

	events: {
		"submit #travel-search": "executeSearch",
		"place_changed #city": "getPlaceDetails"
	},

	render: function(){
		var that = this;
		var renderedContent = this.template()
		this.$el.html(renderedContent)
		this.$el.find(".date").datepicker({
			showOtherMonths: true,
      selectOtherMonths: true,
			autoclose: true
		});
		if(this.$el.find("#city")){
			this.autocomplete = new google.maps.places.Autocomplete(this.$el.find("#city")[0]);
			google.maps.event.addListener(this.autocomplete, 'place_changed', function() {
			  that.getPlaceDetails();
			});
		}
		return this
	},

	executeSearch: function(event){
		event.preventDefault();
	},

	getPlaceDetails: function(event){
		var place = this.autocomplete.getPlace();
		this.lat = place.geometry.location.lat();
		this.long = place.geometry.location.lng();
	}
})