window.Sharebnb.Collections.Images = Backbone.Collection.extend({
	url: "/api/images",

	model: Sharebnb.Models.Image,

	getOrFetch: function(id){
		var model;
		var images = this;
		if(model = images.get(id)){
			model.fetch();
			return model
		} else {
			model = new Sharebnb.Models.Image({id: id})
			model.fetch({
				success: function(){ images.add(model)}
			});
			return model
		}
	}
})