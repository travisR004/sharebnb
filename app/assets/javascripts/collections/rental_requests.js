window.Sharebnb.Collections.RentalRequests = Backbone.Collection.extend({
	url: "/api/rental_requests",

	model: Sharebnb.Models.RentalRequest,

	getOrFetch: function(id){
		var model;
		var rentalRequests = this;

		if(model = rentalRequests.get(id)){
			model.fetch();
			return model
		} else {
			model = new Sharebnb.Models.RentalRequest({id: id});
			model.fetch({
				success: function(){
					rentalRequests.add(model)
				}
			});
			return model
		}
	}
})