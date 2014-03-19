window.Sharebnb.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "homePage"
	},

	homePage: function(){
		var homePageView = new Sharebnb.Views.HomePage();
		this._swapView(homePageView)
	},

	_swapView: function(view){
		if(this.currentView){
			this.currentView.remove();
		}
		this.currentView = view;
		$(".content").html(view.render().$el)
	}
})