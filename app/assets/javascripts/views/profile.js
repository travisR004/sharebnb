window.Sharebnb.Views.Profile = Backbone.CompositeView.extend({

	initialize: function(){
		this.listenTo(this.model.rentals(), "add", this.addRental)
		this.listenTo(this.model.receivedRequests(), "add", this.addReceivedRequest)

		this.refreshCollections()
	},

	template: JST['profile/show'],

	events: {
		"click #received-requests": "toggleDashboard",
		"click #owned-rentals": "toggleDashboard"
	},

	addReceivedRequest: function(receivedRequest){
		if(receivedRequest.escape("status") != "DENIED"){
			var requestShowView = new Sharebnb.Views.RequestResponse({model: receivedRequest});
			this.addSubview(".manage-requests", requestShowView);
			requestShowView.render();
		}
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
		this.model.receivedRequests().each(this.addReceivedRequest.bind(this))
	},

	render: function(){
		var renderedContent = this.template({
			user: this.model
		})
		this.$el.html(renderedContent)
		return this
	},

	toggleDashboard: function(event){
		var active = this.$el.find(".dashboard-active")
		active.toggleClass("dashboard-active");
		active.toggleClass("hidden");
		//must have matching classes be last on dashboard header
		var eventTargetClasses = $(event.currentTarget).attr("class").split(" ")
		var targetClass = eventTargetClasses[eventTargetClasses.length - 1]
		$("." + targetClass + ".hidden").toggleClass("hidden")
	}
})


















