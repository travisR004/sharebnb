window.Sharebnb.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "homePage",
		"account": "showProfile",
		"rentals/new": "newRental",
		"request_response/:id": "requestResponse",
		"rentals/:id": "showRental",
		"rentals/:id/images/new": "newImages",
		"search/:lat/:long/": "search"
	},

	search: function(lat, long, data){
		var searchPageView = new Sharebnb.Views.SearchResult({lat: lat, long: long, data: data});
		this._swapView(searchPageView)
	},

	homePage: function(){
		var homePageView = new Sharebnb.Views.HomePage();
		this._swapView(homePageView);
	},

	newImages: function(id){
		var rental = Sharebnb.Data.rentals.getOrFetch(id);
		var newImageView = new Sharebnb.Views.NewRentalImage({model: rental});
		this._swapView(newImageView)
	},

	requestResponse: function(id){
		var user = new Sharebnb.Collections.Users().getOrFetch(currentUserId)
		var requestResponseView = new Sharebnb.Views.RequestResponse({model: user, requestId: id})

		this._swapView(requestResponseView)
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
		if(!currentUserId){
			$('#sign-in-modal-link').click();
		} else {
			var rental = new Sharebnb.Models.Rental();
			var newRentalView = new Sharebnb.Views.NewRental({model: rental})

			this._swapView(newRentalView)
		}
	},

	_swapView: function(view){
		if(this.currentView){
			this.currentView.remove();
		}
		this.currentView = view;
		$(".content").html(view.render().$el)

		this.currentView.trigger('inDOM');
	}
})