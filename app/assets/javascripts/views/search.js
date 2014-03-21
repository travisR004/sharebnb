window.Sharebnb.Views.SearchResult = Backbone.View.extend({

	initialize: function(options){
		this.lat = options.lat;
		this.long = options.long;
	},

	template: JST["search_results"],

	render: function(){
		var that = this;
		var renderedContent = this.template()
		this.$el.html(renderedContent)
		var mapOptions = {
	    center: new google.maps.LatLng(that.lat, that.long),
			zoom: 12
	  };
		if(this.$el.find("#map-canvas")){
		  map = new google.maps.Map(this.$el.find("#map-canvas")[0], mapOptions);
		}
		return this
	}
})