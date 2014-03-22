window.Sharebnb.Views.SearchResult = Backbone.View.extend({

	initialize: function(options){
		this.lat = options.lat;
		this.long = options.long;
		this.listenTo(this, 'inDOM', this.makeMap);
	},

	template: JST["search/search_results"],

	rentalsTemplate: JST["search/results_list"],

	render: function(){
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		this.makeMap();
		return this
	},

	makeMap: function(){
		var that = this;
		var mapOptions = {
	    center: new google.maps.LatLng(this.lat, this.long),
			zoom: 12
	  };
		this.mapCanvas = this.$el.find("#map-canvas")
		if(this.mapCanvas){
		  this.map = new google.maps.Map(this.mapCanvas[0], mapOptions);
			google.maps.event.bind(this.map, "idle", this, function(){
				this.lat = this.map.center.k
				this.long = this.map.center.A
				this.fetchRentals()
			})
		}
	},

	fetchRentals: function(){
		var that = this;
		var width = this.mapCanvas.width()
		var zoom = this.map.zoom
		$.ajax({
			url: "/api/rentals_in_range",
			type: "GET",
			data: {zoom: zoom, width: width, lat: that.lat, long: that.long},
			success: function(response){
				that.rentals = response;
				var rentalContent = that.rentalsTemplate({rentals: that.rentals})
				that.$el.find("#rental-results").html(rentalContent)
			}
		})
	}
})