window.Sharebnb.Views.Profile = Backbone.CompositeView.extend({

	initialize: function(){
		this.listenTo(this.model.rentals(), "add", this.addRental);
		this.listenTo(this.model.receivedRequests(), "add", this.addReceivedRequest);
		this.listenTo(this.model.madeRequests(), "add", this.addMadeRequest);
		this.listenTo(this.model.rentals(), "remove", this.removeRental);
		this.listenTo(this.model.madeRequests(), "remove", this.removeMadeRequest)

		// this.refreshCollections()
	},

	template: JST['profile/show'],

	events: {
		"click #received-requests": "toggleDashboard",
		"click #owned-rentals": "toggleDashboard",
		"click #made-requests": "toggleDashboard"
	},

	addMadeRequest: function(madeRequest){
		var requestShowView = new Sharebnb.Views.MadeRequest({model: madeRequest});
		madeRequest.fetch();
		this.addSubview(".manage-trips", requestShowView);
		requestShowView.render();
	},

	addReceivedRequest: function(receivedRequest){
		if(receivedRequest.escape("status") != "DENIED"){
			var requestShowView = new Sharebnb.Views.RequestResponse({model: receivedRequest});
			receivedRequest.fetch();
			this.addSubview(".manage-requests", requestShowView);
			requestShowView.render();
		}
	},

	addRental: function(rental){
		var rentalDashboardView = new Sharebnb.Views.RentalDashboard({model: rental})
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
		this.model.madeRequests().each(this.addMadeRequest.bind(this))
	},

	removeMadeRequest: function(
	){
		var profileView = this;
		var madeRequestView = _(this.subviews()['.manage-trips']).find(function(subview){
			return subview.model == madeRequest
		});
		this.removeSubview(".manage-trips", madeRequestView)

	},

	removeRental: function(rental){
		var profileView = this;
		var rentalDashboardView = _(this.subviews()['.rentals']).find(function(subview){
			return subview.model == rental
		});
		this.removeSubview(".rentals", rentalDashboardView)
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
		//must have matching classes as first listed for header
		var targetClass = $(event.currentTarget).attr("class").split(" ")[0]
		$("." + targetClass + ".hidden").toggleClass("hidden").toggleClass("dashboard-active")
	}
})


















