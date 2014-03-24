window.Sharebnb.Models.User = Backbone.Model.extend({
	urlRoot: "/api/users",

	parse: function(jsonResp){

	  if(jsonResp.rentals){
	    this.rentals().set(jsonResp.rentals);
	    delete jsonResp.rentals;
	  }

		if(jsonResp.made_rental_requests){
			this.madeRequests().set(jsonResp.made_rental_requests);
			delete jsonResp.made_rental_requests;
		}

		if(jsonResp.received_rental_requests){
			this.receivedRequests().set(jsonResp.received_rental_requests);
			delete jsonResp.received_rental_requests;
		}

	  return jsonResp
	},

	rentals: function(){
		if(!this._rentals){
			this._rentals = new Sharebnb.Collections.Rentals()
		}
		return this._rentals
	},

	madeRequests: function(){
		if(!this._madeRequests){
			this._madeRequests = new Sharebnb.Collections.RentalRequests()
		}
		return this._madeRequests
	},

	receivedRequests: function(){
		if(!this._receivedRequests){
			this._receivedRequests = new Sharebnb.Collections.RentalRequests()
		}
		return this._receivedRequests
	}
})