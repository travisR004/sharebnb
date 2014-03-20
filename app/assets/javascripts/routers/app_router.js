window.Sharebnb.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "homePage",
		"rentals/new": "newRental",
		"rentals/:id": "showRental"

	},

	homePage: function(){
		var homePageView = new Sharebnb.Views.HomePage();
		this._swapView(homePageView)
	},

	showRental: function(id){
		var rental = Sharebnb.Data.boards.getOrFetch(id)
		var showRentalView = new Sharbnb.Views.ShowRental({model: rental})

		this._swapView(showRentalView)
	},

	newRental: function(){
		var rental = new Sharebnb.Models.Rental();
		var newRentalView = new Sharebnb.Views.RentalForm({model: rental})

		this._swapView(newRentalView)
	},

	_swapView: function(view){
		if(this.currentView){
			this.currentView.remove();
		}
		this.currentView = view;
		$(".content").html(view.render().$el)
	}
})