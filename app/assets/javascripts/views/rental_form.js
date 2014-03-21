window.Sharebnb.Views.RentalForm = Backbone.View.extend({

	template: JST["rental/form"],

	events: {
		"submit #rental-form": "createRental",
		"click .rental": "changeRentalActive",
		"click .room": "changeRoomActive"
	},

	render: function(){
		var renderedContent = this.template({rental: this.model })
		this.$el.html(renderedContent)
		if(this.$el.find("#address")){
			var autocomplete = new google.maps.places.Autocomplete(this.$el.find("#address")[0]);
		}
		return this
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

		Sharebnb.Data.rentals.create(rentalData, {
			success: function(response){
				Backbone.history.navigate("rentals/" + response.id, {trigger: true})
			}
		})
	}

})