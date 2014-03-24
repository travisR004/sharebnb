window.Sharebnb.Views.ShowRental = Backbone.View.extend({

	initialize: function(){
		this.listenTo(this.model, "all", this.render);
	},

	template: JST["rental/show"],

	events: {
		"submit #show-rental-form": "submitRentalRequest"
	},

	submitRentalRequest: function(event){
		event.preventDefault();
		var that = this;
		var rentalRequestData = $(event.target).serializeJSON();
		rentalRequestData.rental_request.rental_id = this.model.id;
		var request = new Sharebnb.Models.RentalRequest(rentalRequestData);
		var start = new Date(request.attributes.rental_request.start_date)
		var end = new Date(request.attributes.rental_request.end_date)
		if(end - start < 0){
			$("#booking-form").append($("<p style='color: red;'> Your dates seem to be backwards!</p>"))
		} else {
			debugger
			request.save({}, {
				success: function(resp){
					that.render();
					$("#booking-form").append($("<p style='color: green;'> Your booking request has been sent!</p>"))
					rentalRequestData["message"].receiver_id = that.model.get("owner_id");
					debugger
					rentalRequestData["message"].rental_request_id = request.id
					var message = new Sharebnb.Models.Message(rentalRequestData);
					message.save()
				},
				error: function(resp){
					console.log(resp)
				}
			});
		}
	},

	render: function(){
		var renderedContent = this.template({rental: this.model});
		this.$el.html(renderedContent);
		this.$el.find(".date").datepicker({
			showOtherMonths: true,
      selectOtherMonths: true,
			autoclose: true
		});
		return this
	}
})