window.Sharebnb.Views.ShowRental = Backbone.View.extend({

	initialize: function(){
		this.listenTo(this.model, "all", this.render)
	},

	template: JST["rental/show"],

	render: function(){
		var renderedContent = this.template({rental: this.model})
		this.$el.html(renderedContent)
		return this
	}

})