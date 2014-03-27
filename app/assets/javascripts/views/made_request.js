window.Sharebnb.Views.MadeRequest = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.messages(), "sync", this.render)
		this.rental = Sharebnb.Data.rentals.getOrFetch(this.model.get("rental_id"))
		this.listenTo(this.rental, "sync", this.getUserEmail)
	},

	template: JST["rental_request/made_request"],

	events: {
		"click .open-compose-message": "toggleMessageComposer",
		"submit .message-form": "createMessage",
		"click .close": "toggleMessageComposer"
	},

	toggleMessageComposer: function(event){
		$("#open-compose-message-" + this.model.id).toggle();
		$("#request-message-form" + this.model.id).toggle("slow")
	},

	getUserEmail: function(){
		users = new Sharebnb.Collections.Users()
		this.owner = users.getOrFetch(this.rental.get("owner_id"))
		this.listenTo(this.owner, "sync", this.render)
	},

	createMessage: function(event){
		var that = this;
		event.preventDefault();
		var messageData = $(event.target).serializeJSON();
		messageData.message.rental_request_id = this.model.id;
		var receiver_id = Sharebnb.Data.rentals.get(this.model.get("rental_id")).get("owner_id");
		messageData.message.receiver_id = receiver_id;
		$("made-request-message-modal" + that.model.id).modal("show");
		$('.modal-backdrop').remove();
		this.openModal = true;
		this.model.messages().create(messageData);
	},

	render: function(){
		if(this.owner){
			var renderedContent = this.template({request: this.model, rental: this.rental, messages: this.model.messages(), email: this.owner.escape("email") });
			this.$el.html(renderedContent);
			if(this.openModal){
				this.$el.find("#made-request-messages").click()
			}
		}
		return this;
	}
})