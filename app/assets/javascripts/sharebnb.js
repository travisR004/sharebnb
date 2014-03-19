window.Sharebnb = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
	Data: {},
  initialize: function() {
		window.Sharebnb.Data.rentals = new Sharebnb.Collections.Rentals();
		new Sharebnb.Routers.AppRouter();
		Backbone.history.start();
  }
};

$(document).ready(function(){
  Sharebnb.initialize();
});
