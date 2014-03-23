window.Sharebnb.Views.RentalDashboard = Backbone.View.extend({

	initialize: function(){
		this.listenTo(this.model, "all", this.render)
	},

	template: JST["rental/dashboard"],

	editBox: JST["rental/edit_box"],

	events: {
		"dblclick .edit-detail": "openEditor",
		"blur #edit-rental": "updateRental",
		"submit form": "updateRental",
		"click .rental": "changeRentalActive",
		"click .room": "changeRoomActive",
		"click #remove-rental": "deleteRental"
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
		this.updateAddress();
	},

	openEditor: function(event){
		var that = this;
		var attr = $(event.currentTarget).data("attr");
		var type = $(event.currentTarget).data("type");
		this.currentRentalId = $(event.currentTarget).parent().data("rental-id")
		var renderedContent = this.editBox({attr: attr , type: type})
		$(event.target).html(renderedContent)
		if(type === "address"){
			this.autocomplete = new google.maps.places.Autocomplete(this.$el.find("#street-address")[0]);
			google.maps.event.addListener(this.autocomplete, 'place_changed', function() {
			  that.getPlaceDetails();
			});
		}
		this.$el.find("#" + type).focus()
		return this
	},

	render: function(){
		var renderedContent = this.template({rental: this.model})
		this.$el.html(renderedContent)
		return this
	},

	updateAddress: function(){
		var that = this;
		var address = this.$el.find("#address").val();
		this.model.save({address: address, lat: this.lat, long: this.long}, {
			patch: true
		})
	},

	updateRental: function(event){
		event.preventDefault();
		var data = $(event.target).serializeJSON().rental
		this.model.save(data, {
			patch: true
		})
	},
})