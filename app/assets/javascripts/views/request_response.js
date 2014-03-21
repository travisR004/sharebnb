window.Sharebnb.Views.RequestResponse = Backbone.View.extend({

	initialize: function(options){
		this.listenTo(this.model, "sync", this.render)
		this.requestId = options.requestId
	},

	template: JST["rental_request/response"],

	render: function(){
		this.request = this.model.receivedRequests().get(this.requestId)
		if(this.request){
			if(!this.requestor){
				this.requestor = new Sharebnb.Collections.Users().getOrFetch(this.request.get("user_id"))
				this.rental = Sharebnb.Data.rentals.getOrFetch(this.request.get("rental_id"))
				this.listenTo(this.requestor, "sync", this.render)
				this.listenTo(this.rental, "sync", this.render)
				this.listenTo(this.request, "sync", this.render)
			}
			var renderedContent = this.template({request: this.request, requestor: this.requestor, rental: this.rental});
			this.$el.html(renderedContent);
		}
		return this;
	},

	events: {
		"click #request-accept": "approveRequest",
		"click #request-deny": "denyRequest"
	},

	approveRequest: function(event){
		event.preventDefault();
		var that = this;
		$.ajax({
			url: 'api/rental_requests/' + this.requestId + "/approve",
			type: "POST",
			success: function(resp){
				that.model.fetch()
			}
		})
	},

	denyRequest: function(event){
		event.preventDefault();
		var that = this;
		$.ajax({
			url: 'api/rental_requests/' + this.requestId + "/deny",
			type: "POST",
			success: function(resp){
				that.model.fetch();
			}
		})
	}
})