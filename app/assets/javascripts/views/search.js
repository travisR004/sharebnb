window.Sharebnb.Views.SearchResult = Backbone.View.extend({

	initialize: function(options){
		this.lat = options.lat;
		this.long = options.long;
		this.listenTo(this, 'inDOM', this.makeMap);
		this.markers = [];
		this.minPrice = 10;
		this.maxPrice = 1000;
		this.minSliderPos = 0;
		this.maxSliderPos = 100;
	},

	template: JST["search/search_results"],

	rentalsTemplate: JST["search/results_list"],

	render: function(){
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		this.makeMap();
		return this
	},

	events: {
		"click .rental-search-item": "goToRental"
	},

	goToRental: function(event){
		var rentalId = $(event.currentTarget).data("id")
		Backbone.history.navigate("rentals/" + rentalId, {trigger: true})
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
				this.lat = this.map.center.k;
				this.long = this.map.center.A;
				this.fetchRentals();
			})
		}
	},

	clearOverlays: function(){
		this.markers.forEach(function(marker){
			marker.setMap(null)
		})
		this.markers = [];
	},

	changeSlider: function(event, ui){
		if(ui.values[0] === this.minSliderPos){
			this.maxPrice = ui.values[1] * 10
			this.maxSliderPos = ui.values[1]
			$("#max-price").text(this.maxPrice)
		} else {
			this.minPrice = ui.values[0] * 10;
			this.minSliderPos = ui.value
			$("#min-price").text(this.minPrice);
		}

	},

	fetchRentals: function(){
		this.clearOverlays();
		this.markers = [];
		var that = this;
		var width = this.mapCanvas.width()
		var zoom = this.map.zoom
		$.ajax({
			url: "/api/rentals_in_range",
			type: "GET",
			data: {
						 zoom: zoom,
						 width: width,
						 lat: that.lat,
						 long: that.long,
						 min_price: that.minPrice,
						 max_price: that.maxPrice
					  },
			success: function(response){
				that.rentals = response;
				var rentalContent = that.rentalsTemplate({
					rentals: that.rentals,
					minSliderPos: that.minSliderPos,
					maxSliderPos: that.maxSliderPos
				});

				that.$el.find("#rental-results").html(rentalContent);
				that.$el.find(".price-range-slider").slider({
					values: [ that.minSliderPos, that.maxSliderPos ],
					range: true,
					step: 0.5,
					slide: that.changeSlider.bind(that),
					stop: that.fetchRentals.bind(that)
				});
				that.rentals.forEach(function(rental){
					var image = "assets/bighouse.png";
					var latLong = new google.maps.LatLng(rental.lat, rental.long);
					var marker = new google.maps.Marker({
						position: latLong,
						map: that.map,
						icon: image
					})
					that.markers.push(marker)
				})
			}
		})
	}
})