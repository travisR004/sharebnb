window.Sharebnb.Views.MadeRequest = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, "all", this.render);
		this.listenTo(this.model.messages(), "sync", this.render)
	},

	template: JST["rental_request/made_request"],

	render: function(){
		var rental = Sharebnb.Data.rentals.getOrFetch(this.model.get("rental_id"))
		var renderedContent = this.template({request: this.model, rental: rental, messages: this.model.messages() });
		this.$el.html(renderedContent);
		return this;
	}
})