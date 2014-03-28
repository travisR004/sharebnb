window.Sharebnb.Views.RequestResponse = Backbone.View.extend({

	initialize: function(){
		this.listenTo(this.model, "all", this.render)
		this.requestor = new Sharebnb.Collections.Users().getOrFetch(this.model.get("user_id"))
		this.rental = Sharebnb.Data.rentals.getOrFetch(this.model.get("rental_id"))
		this.listenTo(this.requestor, "sync", this.render)
		this.listenTo(this.model.messages(), "sync", this.render)
	},

	template: JST["rental_request/response"],

	render: function(){
		var renderedContent = this.template({request: this.model, requestor: this.requestor, rental: this.rental, messages:this.model.messages() });
		this.$el.html(renderedContent);
		if(this.openModal){
			this.$el.find("#messages").click()
		}
		return this;
	},

	events: {
		"click #request-accept": "approveRequest",
		"click #request-deny": "denyRequest",
		"click .open-response-message": "toggleMessageComposer",
		"submit .message-form": "createMessage",
		"click .close": "toggleMessageComposer",
		"click #messages": "markMessagesAsRead"
	},

	markMessagesAsRead: function(){
		var that = this
		this.model.messages().forEach(function(message){
			if(!message.get("read") && message.get("sender_id") != currentUserId){
				message.save({read: true},{
					success: function(response){
						$('.modal-backdrop').remove();
						that.openModal = true;
					}
				})
			}
		})
	},

	toggleMessageComposer: function(event){
		$("#errors-" + this.model.id).empty()
		$("#open-response-message-" + this.model.id).toggle();
		$("#message-form" + this.model.id).toggle("slow")
		this.openModal = false;
	},

	createMessage: function(){
		var that = this;
		event.preventDefault();
		var messageData = $(event.target).serializeJSON();
		messageData.message.rental_request_id = this.model.id;
		messageData.message.receiver_id = this.model.escape("user_id");
		this.model.messages().create(messageData, {
			success: function(response) {
				$("made-request-message-modal" + that.model.id).modal("show");
				$('.modal-backdrop').remove();
				that.openModal = true;
			},
			error: function(model, response){
				response.responseJSON.forEach(function(response){
					$("#errors-" + that.model.id).append("<p>- " + response + "</p>")
				});
			}
		});
	},

	approveRequest: function(event){
		event.preventDefault();
		var that = this;
		$.ajax({
			url: 'api/rental_requests/' + this.model.id + "/approve",
			type: "POST",
			success: function(resp){
				that.model.set("status", "APPROVED")
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
				that.model.set("status", "DENIED");
			}
		})
	}
})