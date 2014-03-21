window.Sharebnb.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "homePage",
		"account": "showProfile",
		"rentals/new": "newRental",
		"request_response/:id": "requestResponse",
		"rentals/:id": "showRental"
	},

	homePage: function(){
		var homePageView = new Sharebnb.Views.HomePage();
		this._swapView(homePageView);
	},

	requestResponse: function(id){
		var receivedRequests = new Sharebnb.Collections.Users().getOrFetch(id).receivedRequests()

		debugger
	},

	showProfile: function(){
		if(currentUserId){
			var users = new Sharebnb.Collections.Users();
			var user = users.getOrFetch(currentUserId);
			var showProfileView = new Sharebnb.Views.Profile({model: user});
			this._swapView(showProfileView)
		} else {
			$('#sign-in-modal-link').click();
		}
	},

	showRental: function(id){
		var rental = Sharebnb.Data.rentals.getOrFetch(id)
		var showRentalView = new Sharebnb.Views.ShowRental({model: rental})

		this._swapView(showRentalView)
	},

	newRental: function(){
		var rental = new Sharebnb.Models.Rental();
		var newRentalView = new Sharebnb.Views.RentalForm({model: rental})

		this._swapView(newRentalView)
		if(!currentUserId){
			$('#sign-in-modal-link').click();
		}
	},

	_swapView: function(view){
		if(this.currentView){
			this.currentView.remove();
		}
		this.currentView = view;
		$(".content").html(view.render().$el)
	}
})