window.Sharebnb.Views.RentalDashboard = Backbone.View.extend({

	initialize: function(){
		this.listenTo(this.model, "all", this.render)
	},

	template: JST["rental/dashboard"],

	editBox: JST["rental/edit_box"],

	events: {
		"blur #edit-rental": "updateRental",
		"submit form": "updateRental",
		"click .rental": "changeRentalActive",
		"click .room": "changeRoomActive",
		"click #remove-rental": "deleteRental",
		"click #update-rental": "showEditForm",
		"click #show-rental": "showRental",
		"click #submit-update": "updateRental",
		"click .show-description": "showDescription",
		"click .close-description": "showDescription"
	},

	showDescription: function(event){
		event.preventDefault();
		$("#description" + this.model.id).toggleClass("hidden")
		$("#show-description" + this.model.id).toggleClass("hidden")
	},

	showRental: function(event){
		event.preventDefault();
		Backbone.history.navigate("rentals/" + this.model.id, {trigger: true})
	},

	deleteRental: function(event){
		event.preventDefault();
		this.model.destroy();
	},

	updateRental: function(){
		event.preventDefault();
		var rentalData = $(event.target).parent().serializeJSON();
		if(this.lat){
			rentalData["rental"].lat = this.lat;
			rentalData["rental"].long = this.long;
		}
		this.model.save(rentalData)
	},

	showEditForm: function(event){
		event.preventDefault();
		var that = this;
		$("#rental" + this.model.id).toggleClass("hidden")
		$("#edit-rental" + this.model.id).toggleClass("hidden");
		if(this.$el.find("#address")[0]){
			this.autocomplete = new google.maps.places.Autocomplete(this.$el.find("#address")[0]);
			google.maps.event.addListener(this.autocomplete, 'place_changed', function() {
			  that.getPlaceDetails();
			});
		}
	},

	changeRentalActive: function(event) {
		this.$el.find(".rental.selected").toggleClass("selected")
		$(event.currentTarget).toggleClass("selected")
	},

	changeRoomActive: function(event) {
		this.$el.find(".room.selected").toggleClass("selected")
		$(event.currentTarget).toggleClass("selected")
	},

	getPlaceDetails: function(){
		var place = this.autocomplete.getPlace();
		this.lat = place.geometry.location.lat();
		this.long = place.geometry.location.lng();
	},

	render: function(){
		var renderedContent = this.template({rental: this.model})
		this.$el.html(renderedContent)
		return this
	}
})