window.Sharebnb.Views.MadeRequest = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.messages(), "sync", this.render)
		this.rental = Sharebnb.Data.rentals.getOrFetch(this.model.get("rental_id"))
	},

	template: JST["rental_request/made_request"],

	events: {
		"click #open-compose-message": "toggleMessageComposer",
		"submit .message-form": "createMessage"
	},

	toggleMessageComposer: function(event){
		event.preventDefault();
		$("#open-compose-message").toggle();
		$("#request-message-form" + this.model.id).toggle("slow")
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
		var renderedContent = this.template({request: this.model, rental: this.rental, messages: this.model.messages() });
		this.$el.html(renderedContent);
		if(this.openModal){
			this.$el.find("#made-request-messages").click()
		}
		return this;
	}
})