window.Sharebnb.Collections.Messages = Backbone.Collection.extend({
	url: "/api/messages",

	model: Sharebnb.Models.Message,

	getOrFetch: function(id){
		var model;
		var messages = this;

		if(model = messages.get(id)){
			model.fetch();
			return model;
		} else {
			model = new Sharebnb.Models.Message({id: id})
			model.fetch({
				success: function(){messages.add(model)}
			})
			return model
		}
	}
})