window.Sharebnb.Collections.Rentals = Backbone.Collection.extend({
	url: "/api/rentals",

	model: Sharebnb.Models.Rental,

	getOrFetch: function(id){
		var model;
		var rentals = this;

		if(model = rentals.get(id)){
			model.fetch();
			return model
		} else {
			model = new Sharebnb.Models.Rental({id: id});
			model.fetch({
				success: function(){
					rentals.add(model)
				}
			});
			return model
		}
	}
})