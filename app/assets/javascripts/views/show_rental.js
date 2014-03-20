window.Sharebnb.Views.ShowRental = Backbone.View.extend({

	template: JST["rental/show"],

	render: function(){
		var renderedContent = this.template({rental: this.model})
		this.$el.html(renderedContent)
		return this
	}

})