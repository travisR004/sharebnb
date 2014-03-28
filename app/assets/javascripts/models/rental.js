window.Sharebnb.Models.Rental = Backbone.Model.extend({
	urlRoot: "/api/rentals",

	parse: function(jsonResp){
	  if(jsonResp.images){
	    this.images().set(jsonResp.images);
	    delete jsonResp.images;
	  }
	  if(jsonResp.requests){
	    this.requests().set(jsonResp.requests);
	    delete jsonResp.requests;
	  }
		return jsonResp
	},

	requests: function(){
		if(!this._requests){
			this._requests = new Sharebnb.Collections.RentalRequests();
		}
		return this._requests
	},

	images: function(){
		if(!this._images){
			this._images = new Sharebnb.Collections.Images();
		}
		return this._images
	},

	blackedOutDates: function(){
		debugger
		var requests = this.requests()
		requests.forEach(function(request){
			if(request.escape("status") === "APPROVED"){
				var start = this.get("start_date")
				var end = this.get("start_date")
			}
		})
	}

})