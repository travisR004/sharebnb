window.Sharebnb.Views.SearchResult = Backbone.View.extend({
	template: JST["search_results"],

	render: function(){
		var renderedContent = this.template()
		this.$el.html(renderedContent)
		if(this.$el.find("#map-canvas")){
			var map = new google.maps.Map(this.$el.find("#map-canvas"))
		}
		return this
	}
})