window.Sharebnb.Views.NewRentalImage = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.images(), "add", this.render)
  },

  template: JST["rental/new_images"],

  render: function(){
    var renderedContent = this.template({ images: this.model.images() });
    this.$el.html(renderedContent);
    this.makeSortable();
    return this;
  },

  events: {
    "submit form": "addImage",
    "click #submit-images": "addImage",
    "click #upload-image": "openImager",
    "change #image-upload": "handleFiles"
  },

  openImager: function(event){
    event.preventDefault();
    $("#image-upload").click();
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
        $("#new-image").append($input)
      }
      reader.readAsDataURL(files[i]);
    }
    // $("#image-titles").append(files[files.length - 1].name + " / ")
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
    var imageData = $(event.target).parent().serializeJSON()
    imageData.image.rental_id = this.model.id;
    imageData.image.rank = this.model.images().length + 1
    this.model.images().create(imageData, {
      wait: true,
      success: function(response){
        that.model.fetch()
      }
    })
  }
})