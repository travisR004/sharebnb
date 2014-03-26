window.Sharebnb.Collections.FavoriteRentals = Backbone.Collection.extend({
	url: "/api/favorite_rentals",

	model: Sharebnb.Models.FavoriteRental,

	getOrFetch: function(id){
		var model;
		var favoriteRentals = this;

		if(model = favoriteRentals.get(id)){
			model.fetch();
			return model
		} else {
			model = new Sharebnb.Models.FavoriteRental({id: id})
			model.fetch({
				success: function(){
					favoriteRentals.add(model)
				}
			})
			return model
		}
	}
})