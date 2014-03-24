window.Sharebnb.Views.MadeRequest = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, "all", this.render);
		this.listenTo(this.model.messages(), "add", this.render)
	},

	template: JST["rental_request/made_request"],

	events: {
		"click #open-compose-message": "toggleMessageComposer",
		"click #submit-message": "createMessage"
	},

	toggleMessageComposer: function(event){
		event.preventDefault();
		$("#open-compose-message").toggle();
		$("#message-form").toggle("slow")
	},

	closeMessageBox: function(event){
		event.preventDefault();
		$("#open-compose-message").toggle("slow");
		$("#message-form").toggle()
	},

	createMessage: function(event){
		var that = this;
		event.preventDefault();
		this.closeMessageBox(event);
		var messageData = $(event.currentTarget).parent().serializeJSON();
		messageData.message.rental_request_id = this.model.id;
		var receiver_id = Sharebnb.Data.rentals.get(this.model.get("rental_id")).get("owner_id");
		messageData.message.receiver_id = receiver_id;
		$("made-request-message-modal" + that.model.id).modal("show");
		$('.modal-backdrop').remove();
		this.model.messages().create(messageData);
	},

	render: function(){
		var rental = Sharebnb.Data.rentals.getOrFetch(this.model.get("rental_id"))
		var renderedContent = this.template({request: this.model, rental: rental, messages: this.model.messages() });
		this.$el.html(renderedContent);
		return this;
	}
})