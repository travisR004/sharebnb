window.Sharebnb.Models.Rental = Backbone.Model.extend({
	urlRoot: "/api/rentals",

	parse: function(jsonResp){
	  if(jsonResp.images){
	    this.images().set(jsonResp.images);
	    delete jsonResp.images;
	  }
		return jsonResp
	},

	images: function(){
		if(!this._images){
			this._images = new Sharebnb.Collections.Images();
		}
		return this._images
	}
})