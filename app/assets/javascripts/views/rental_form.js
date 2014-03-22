window.Sharebnb.Views.RentalForm = Backbone.View.extend({

	template: JST["rental/form"],

	events: {
		"submit #rental-form": "createRental",
		"click .rental": "changeRentalActive",
		"click .room": "changeRoomActive"
	},

	render: function(){
		var that = this;
		var renderedContent = this.template({rental: this.model })
		this.$el.html(renderedContent)
		if(this.$el.find("#address")){
			this.autocomplete = new google.maps.places.Autocomplete(this.$el.find("#address")[0]);
			google.maps.event.addListener(this.autocomplete, 'place_changed', function() {
			  that.getPlaceDetails();
			});
		}
		return this
	},

	getPlaceDetails: function(){
		var place = this.autocomplete.getPlace();
		this.lat = place.geometry.location.lat();
		this.long = place.geometry.location.lng();
	},

	changeRentalActive: function(event) {
		this.$el.find(".rental.selected").toggleClass("selected")
		$(event.currentTarget).toggleClass("selected")
	},

	changeRoomActive: function(event) {
		this.$el.find(".room.selected").toggleClass("selected")
		$(event.currentTarget).toggleClass("selected")
	},

	createRental: function(event){
		event.preventDefault();
		var rentalData = $(event.target).serializeJSON();
		debugger
		rentalData["rental"].lat = "" + this.lat;
		rentalData["rental"].long = "" + this.long;
		Sharebnb.Data.rentals.create(rentalData, {
			success: function(response){
				Backbone.history.navigate("rentals/" + response.id, {trigger: true})
			}
		})
	}

})