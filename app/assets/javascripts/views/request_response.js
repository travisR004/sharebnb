window.Sharebnb.Views.RequestResponse = Backbone.View.extend({

	initialize: function(options){
		this.listenTo(this.model, "all", this.render)
	},

	template: JST["rental_request/response"],

	render: function(){
		if(!this.requestor){
			this.requestor = new Sharebnb.Collections.Users().getOrFetch(this.model.get("user_id"))
			this.rental = Sharebnb.Data.rentals.getOrFetch(this.model.get("rental_id"))
			this.listenTo(this.requestor, "sync", this.render)
		}
		var renderedContent = this.template({request: this.model, requestor: this.requestor, rental: this.rental});
		this.$el.html(renderedContent);
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
			url: 'api/rental_requests/' + this.model.id + "/approve",
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
			url: 'api/rental_requests/' + this.model.id + "/deny",
			type: "POST",
			success: function(resp){
				that.model.fetch();
			}
		})
	}
})