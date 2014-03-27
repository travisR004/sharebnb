window.Sharebnb.Views.RentalDashboard = Backbone.View.extend({

	initialize: function(){
		this.listenTo(this.model, "all", this.render)
		this.model.fetch();
	},

	template: JST["rental/dashboard"],

	editBox: JST["rental/edit_box"],

	events: {
		"blur #edit-rental": "updateRental",
		"submit form": "updateRental",
		"click .rental": "changeRentalActive",
		"click .room": "changeRoomActive",
		"click #remove-rental": "deleteRental",
		"click #update-rental": "showEditForm",
		"click #show-rental": "showRental",
		"click #submit-update": "updateRental",
		"click .show-description": "showDescription",
		"click .close-description": "showDescription",
		"submit form": "addImage",
		"click .submit-images": "addImage",
		"click .upload-image": "openImager",
		"change .image-upload": "handleFiles"
	},

	openImager: function(event){
		event.preventDefault();
		$("#image-upload-" + this.model.id).click();
	},

	handleFiles: function(event){
		event.preventDefault();
		debugger
		var that = this;
		var files = event.target.files;
		for(var i = 0; i < files.length; i++){
			var reader = new FileReader();
			reader.onload = function(ev){
				var $input = $('<input type="hidden" name="image[photo][]">')
				$input.val(ev.target.result);
				$("#new-image-" + that.model.id).append($input)
			}
			reader.readAsDataURL(files[i]);
		}
		$("#image-titles-" + this.model.id).append(files[files.length - 1].name + " / ")
	},

	makeSortable: function(){
		var rentalView = this;
		$(".image-sorter").sortable({
			update: function(event, ui, list){
				var prevRank = ui.item.prev().data("rank");
				var nextRank = ui.item.next().data("rank");

				if( prevRank && nextRank){
					var avgRank = (prevRank + nextRank) / 2
				} else if( prevRank ){
					var avgRank = prevRank + 1
				} else {
					var avgRank = nextRank / 2
				}

				var image = rentalView.model.images().getOrFetch(ui.item.data("id"));
				image.save({rank: avgRank})
			}
		});
	},

	addImage: function(event){
		event.preventDefault();
		var that = this;
		var reader = new FileReader();
		debugger
		var imageData = $(event.target).parent().serializeJSON()
		imageData.image.rental_id = this.model.id;
		imageData.image.rank = this.model.images().length + 1
		this.model.images().create(imageData, {
			wait: true,
			success: function(response){
				that.model.fetch()
			}
		})
	},

	startCarousel: function(){
    this.$el.find('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
	},

	showDescription: function(event){
		event.preventDefault();
		$("#description" + this.model.id).toggleClass("hidden")
		$("#show-description" + this.model.id).toggleClass("hidden")
	},

	showRental: function(event){
		event.preventDefault();
		Backbone.history.navigate("rentals/" + this.model.id, {trigger: true})
	},

	deleteRental: function(event){
		event.preventDefault();
		this.model.destroy();
		this.render()
	},

	updateRental: function(){
		event.preventDefault();
		var rentalData = $(event.target).parent().serializeJSON();
		if(this.lat){
			rentalData["rental"].lat = this.lat;
			rentalData["rental"].long = this.long;
		}
		this.model.save(rentalData)
	},

	showEditForm: function(event){
		event.preventDefault();
		var that = this;
		$("#rental" + this.model.id).toggleClass("hidden")
		$("#edit-rental" + this.model.id).toggleClass("hidden");
		if(this.$el.find("#address")[0]){
			this.autocomplete = new google.maps.places.Autocomplete(this.$el.find("#address")[0]);
			google.maps.event.addListener(this.autocomplete, 'place_changed', function() {
			  that.getPlaceDetails();
			});
		}
	},

	changeRentalActive: function(event) {
		this.$el.find(".rental.selected").toggleClass("selected")
		$(event.currentTarget).toggleClass("selected")
	},

	changeRoomActive: function(event) {
		this.$el.find(".room.selected").toggleClass("selected")
		$(event.currentTarget).toggleClass("selected")
	},

	getPlaceDetails: function(){
		var place = this.autocomplete.getPlace();
		this.lat = place.geometry.location.lat();
		this.long = place.geometry.location.lng();
	},

	render: function(){
		var renderedContent = this.template({rental: this.model, images: this.model.images()})
		this.$el.html(renderedContent)
		this.startCarousel()
		return this
	}
})