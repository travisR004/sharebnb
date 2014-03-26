window.Sharebnb.Views.HomePage = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this, 'inDOM', this.focusSearch);
	},

	template: JST["home"],

	events: {
		"keypress #city": "stopSubmit",
		"submit #travel-search": "executeSearch",
		"place_changed #city": "getPlaceDetails"
	},

	focusSearch: function(){
		$("#city").focus()
	},

	render: function(){
		var that = this;
		var today = new Date()
		var renderedContent = this.template()
		this.$el.html(renderedContent)
		this.$el.find(".date").datepicker({
			showOtherMonths: true,
      selectOtherMonths: true,
			autoclose: true,
			constrainInput: false,
			minDate: today
		});
		var searchInput = this.$el.find("#city");
		if(searchInput){
			this.autocomplete = new google.maps.places.Autocomplete(searchInput[0]);
			google.maps.event.addListener(this.autocomplete, 'place_changed', function() {
			  that.getPlaceDetails();
			});
		}
		return this
	},

	stopSubmit: function(event){
		if(event.which === 13){
			event.preventDefault();
			event.stopPropagation();
		}
	},

	executeSearch: function(event){
		event.preventDefault();
		Sharebnb.Data.searchParams = $(event.target).serializeJSON()["location"]
		Backbone.history.navigate("search/" + this.lat + "/" + this.long + "/", {trigger: true})
	},

	getPlaceDetails: function(){
		var place = this.autocomplete.getPlace();
		this.lat = place.geometry.location.lat();
		this.long = place.geometry.location.lng();
	}
})