window.Sharebnb.Views.Profile = Backbone.CompositeView.extend({

	initialize: function(){
		this.listenTo(this.model.rentals(), "add", this.addRental)

		this.refreshCollections()
	},

	template: JST['profile/show'],

	events: {
		"click .request-response": "respondToRequest"
	},

	addRental: function(rental){
		var rentalDashboardView = new Sharebnb.Views.RentalDashboard({
			model: rental
		})
		this.addSubview(".rentals", rentalDashboardView)
		rentalDashboardView.render();
	},

	deleteRental: function(event){
		event.preventDefault();
		event.stopPropagation();
		var rentalId = $(event.currentTarget).parent().parent().data("rental-id")
		var rental = this.model.rentals().get(rentalId)
		rental.destroy()
	},

	refreshCollections: function(){
		this.model.rentals().each(this.addRental.bind(this))
		// this.model.receivedRequests().each(this.addReceivedRequest.bind(this))
	},

	render: function(){
		var renderedContent = this.template({
			user: this.model
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