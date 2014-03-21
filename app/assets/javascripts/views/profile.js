window.Sharebnb.Views.Profile = Backbone.View.extend({

	initialize: function(){
		this.listenTo(this.model, "add", this.render)
	},

	template: JST['profile'],

	events: {
		"click .request-response": "respondToRequest"
	},

	render: function(){
		var renderedContent = this.template({
			user: this.model,
			rentals: this.model.rentals(),
			madeRequests: this.model.madeRequests(),
			receivedRequests: this.model.receivedRequests()
		})
		this.$el.html(renderedContent)
		return this
	},

	respondToRequest: function(event){
		event.preventDefault();
		var responseId = $(event.target).data("id")
		Backbone.history.navigate("request_response/" + responseId, {trigger: true})
	}
})