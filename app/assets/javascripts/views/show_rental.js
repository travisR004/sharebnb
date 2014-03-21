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
		var rentalRequestData = $(event.target).serializeJSON();
		rentalRequestData.rental_request.rental_id = this.model.id;
		var request = new Sharebnb.Models.RentalRequest(rentalRequestData);
		request.save({},
			{
				success: function(resp){
					alert(resp)
				},
				error: function(resp){
					console.log(resp)
				}
			})
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