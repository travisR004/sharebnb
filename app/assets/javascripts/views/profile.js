window.Sharebnb.Views.Profile = Backbone.View.extend({

	initialize: function(){
		this.listenTo(this.model, "add", this.render)
		this.listenTo(this.model.rentals(), "add change sync remove", this.render)
	},

	template: JST['profile/show'],
	editBox: JST["profile/edit_box"],

	events: {
		"click .request-response": "respondToRequest",
		"dblclick .edit-detail": "openEditor",
		"blur #edit-rental": "updateRental",
		"submit form": "updateRental",
		"click .rental": "changeRentalActive",
		"click .room": "changeRoomActive",
		"click #remove-rental": "deleteRental"
	},

	openEditor: function(event){
		var that = this;
		var attr = $(event.currentTarget).data("attr");
		var type = $(event.currentTarget).data("type");
		this.currentRentalId = $(event.currentTarget).parent().data("rental-id")
		var renderedContent = this.editBox({attr: attr , type: type})
		$(event.target).html(renderedContent)
		if(type === "address"){
			this.autocomplete = new google.maps.places.Autocomplete(this.$el.find("#" + type)[0]);
			google.maps.event.addListener(this.autocomplete, 'place_changed', function() {
			  that.getPlaceDetails();
			});
		}
		this.$el.find("#" + type).focus()
		return this
	},

	deleteRental: function(event){
		event.preventDefault();
		event.stopPropagation();
		var rentalId = $(event.currentTarget).parent().parent().data("rental-id")
		var rental = this.model.rentals().get(rentalId)
		rental.destroy()
	},

	getPlaceDetails: function(){
		var place = this.autocomplete.getPlace();
		this.lat = place.geometry.location.lat();
		this.long = place.geometry.location.lng();
		this.updateAddress();
	},

	updateAddress: function(){
		var address = this.$el.find("#address").val();
		var listing = this.model.rentals().get(this.currentRentalId)
		listing.save({address: address, lat: this.lat, long: this.long}, {
			patch: true
		})
	},

	updateRental: function(event){
		event.preventDefault();
		var that = this;
		var listing = this.model.rentals().get(this.currentRentalId);
		var data = $(event.target).serializeJSON().rental
		listing.save(data, {
			patch: true
		})
	},

	changeRentalActive: function(event) {
		this.$el.find(".rental.selected").toggleClass("selected")
		$(event.currentTarget).toggleClass("selected")
	},

	changeRoomActive: function(event) {
		this.$el.find(".room.selected").toggleClass("selected")
		$(event.currentTarget).toggleClass("selected")
	},

	render: function(){
		var renderedContent = this.template({
			user: this.model,
			rentals: this.model.rentals(),
			madeRequests: this.model.madeRequests(),
			receivedRequests: this.model.receivedRequests()
		})
		this.$el.html(renderedContent)
		return this
	},

	respondToRequest: function(event){
		event.preventDefault();
		var responseId = $(event.target).data("id")
		Backbone.history.navigate("request_response/" + responseId, {trigger: true})
	}
})