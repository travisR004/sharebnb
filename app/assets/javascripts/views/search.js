window.Sharebnb.Views.SearchResult = Backbone.View.extend({

	initialize: function(options){
		this.lat = options.lat;
		this.long = options.long;
		if(Sharebnb.Data.searchParams){
			if(Sharebnb.Data.searchParams.checkin){
				this.checkIn = Sharebnb.Data.searchParams.checkin;
			}
			if(Sharebnb.Data.searchParams.checkin){
				this.checkOut = Sharebnb.Data.searchParams.checkout;
			}
			this.guests = Sharebnb.Data.searchParams.guests
		}

		this.listenTo(this, 'inDOM', this.makeMap);
		this.markers = [];
		this.minPrice = 10;
		this.maxPrice = 1000;
		this.minSliderPos = 0;
		this.maxSliderPos = 100;
		this.roomParams = ["Whole Home/Apt", "Private Room", "Shared Room"];
	},

	assignDatePicker: function(){
		this.$el.find(".date").datepicker({
			showOtherMonths: true,
      selectOtherMonths: true,
			autoclose: true,
			constrainInput: false,
			minDate: new Date()
		});
	},

	changeRoomActive: function(event) {
		event.preventDefault();
		$(event.currentTarget).toggleClass("selected");
		var roomParams = [];
		$(".selected").each(function(){
			roomParams.push($(this).data("name"));
		})
		this.roomParams = roomParams;
		this.fetchRentals();
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

	clearOverlays: function(){
		this.markers.forEach(function(marker){
			marker.setMap(null)
		})
		this.markers = [];
	},

	events: {
		"click .book-now": "goToRental",
		"click .room-type": "changeRoomActive",
		"change #checkin": "updateCheckin",
		"change #checkout": "updateCheckout",
		"change .guest-select": "updateGuests"
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
			data: {zoom: zoom,
						 width: width,
						 lat: that.lat,
						 long: that.long,
						 min_price: that.minPrice,
						 max_price: that.maxPrice,
						 room_types: that.roomParams
					  },
			success: function(response){
				that.renderRentals(response)
				that.makeSlider();
				that.setMarkers();
			}
		})
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

	makeSlider: function(){
		this.$el.find(".price-range-slider").slider({
			values: [ this.minSliderPos, this.maxSliderPos ],
			range: true,
			step: 0.5,
			slide: this.changeSlider.bind(this),
			stop: this.fetchRentals.bind(this)
		});
	},

	render: function(){
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		this.makeMap();
		return this
	},

	renderRentals: function(response){
		this.rentals = response.rentals;
		var rentalContent = this.rentalsTemplate({
			rentals: this.rentals,
			minSliderPos: this.minSliderPos,
			maxSliderPos: this.maxSliderPos,
			roomParams: this.roomParams,
			checkIn: this.checkIn,
			checkOut: this.checkOut,
			guests: this.guests
		});
		this.$el.find("#rental-results").html(rentalContent);
		this.assignDatePicker();
		this.startCarousel();
	},

	rentalsTemplate: JST["search/results_list"],

	setMarkers: function(){
		var that = this;
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
	},

	startCarousel: function(){
    this.$el.find('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
	},

	template: JST["search/search_results"],

	updateCheckin: function(event){
		event.preventDefault();
		this.checkIn = $(event.target).serializeJSON().checkin
		this.fetchRentals();
	},

	updateCheckout: function(event){
		event.preventDefault();
		this.checkOut = $(event.target).serializeJSON().checkout
		this.fetchRentals();
	},

	updateGuests: function(event){
		event.preventDefault();
		this.guests = $(event.target).serializeJSON().guests
	}
})