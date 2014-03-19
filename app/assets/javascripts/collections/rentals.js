window.Sharebnb.Collections.Rentals = Backbone.Collection.extend({
	url: "/api/posts",

	model: Sharebnb.Models.Rental,

	getOrFetch: function(){
		var model;
		var rentals = this;

		if(model = this.rentals.get(id)){
			model.fetch();
			return model
		} else {
			model = new Sharebnb.Models.Model({id: id});
			model.fetch({
				success: function(){
					rentals.add(model)
				}
			});
			return model
		}
	}
})