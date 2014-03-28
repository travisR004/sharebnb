window.Sharebnb.Views.NewRental = Backbone.View.extend({

	template: JST["rental/new"],

	events: {
		"submit #rental-form": "createRental",
		"click .rental": "changeRentalActive",
		"click .room": "changeRoomActive",
		"keypress #address": "stopSubmit"
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
		this.$el.find(".errors").empty();
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
		rentalData["rental"].lat = "" + this.lat;
		rentalData["rental"].long = "" + this.long;
		if(!this.lat){
			$(".errors").append("You must select a choose an address from the search results!")
		} else {
			Sharebnb.Data.rentals.create(rentalData, {
				success: function(response){
					Backbone.history.navigate("account", {trigger: true})
				},
				error: function(model, response){
					response.responseJSON.forEach(function(response){
						var check = response.split(" ")
						if (check[check.length - 1] != "list"){
							$(".errors").append("<p>- " + response + "</p>")
						}
					})
				}
			})
		}
	},
	stopSubmit: function(event){
		if(event.which === 13){
			event.preventDefault();
			event.stopPropagation();
		}
	}

})