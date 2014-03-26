window.Sharebnb.Views.NewRentalImage = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
	},

	template: JST["rental/new_images"],

	render: function(){
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},

	events: {
		"submit form": "addImage",
		"change #image-upload": "handleFiles"
	},

	handleFiles: function(event){
		event.preventDefault();
		var that = this;
		var files = event.target.files;

		for(var i = 0; i < files.length; i++){
			var reader = new FileReader();
			reader.onload = function(ev){
				var $input = $('<input type="hidden" name="image[photo]">')
				$input.val(ev.target.result);
				that.$("#new-image").append($input)
			}
			reader.readAsDataURL(files[i]);
		}
	},

	addImage: function(event){
		event.preventDefault();
		var reader = new FileReader();
		var imageData = $(event.target).serializeJSON()
		imageData.image.rental_id = this.model.id;
		imageData.image.rank = this.model.images().length + 1
		this.model.images().create(imageData)
	}
})