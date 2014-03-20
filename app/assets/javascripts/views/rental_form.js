window.Sharebnb.Views.RentalForm = Backbone.View.extend({

	template: JST["rental/form"],

	render: function(){
		var renderedContent = this.template({rental: this.model })
		this.$el.html(renderedContent)
		return this
	}

})