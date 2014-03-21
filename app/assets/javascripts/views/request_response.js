window.Sharebnb.Views.RequestResponse = Backbone.View.extend({

	initialize: function(options){
		this.listenTo(this.model, "add sync", this.render)
		this.requestId = options.requestId
	},

	template: JST["rental_request/response"],

	render: function(){
		var request = this.model.receivedRequests().get(this.requestId)
		if(request){
			var renderedContent = this.template({request: request});
			this.$el.html(renderedContent);
		}
		return this;
	}
})