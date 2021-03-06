window.Sharebnb.Views.ShowRental = Backbone.View.extend({

  initialize: function(){
    this.listenTo(this.model, "all", this.render);
    this.listenTo(this.model.images(), "sync", this.render)
  },

  template: JST["rental/show"],

  events: {
    "submit #show-rental-form": "submitRentalRequest"
  },

  datesIncorrect: function(request){
    var start = new Date(request.attributes.rental_request.start_date)
    var end = new Date(request.attributes.rental_request.end_date)
    if(end - start < 0){
      return true
    } else {
      return false
    }
  },

  submitRentalRequest: function(event){
    event.preventDefault();
    $(".errors").empty();
    var that = this;
    var rentalRequestData = $(event.target).serializeJSON();
    rentalRequestData.rental_request.rental_id = this.model.id;
    var request = new Sharebnb.Models.RentalRequest(rentalRequestData);
    if(this.datesIncorrect(request)){
      $(".errors").append($("<p style='color: red;'> Your dates seem to be backwards!</p>"))
    } else {
      request.save({}, {
        success: function(resp){
          that.render();
          $(".errors").append($("<p style='color: green;'> Your booking request has been sent!</p>"))
          that.submitMessage(rentalRequestData, request)
        },
        error: function(model, response){
          response.responseJSON.forEach(function(response){
            $(".errors").append(response)
          })
        }
      });
    }
  },

  submitMessage: function(params, request){
    var that = this
    params["message"].receiver_id = this.model.get("owner_id");
    params["message"].rental_request_id = request.id
    if(currentUserId){
      var message = new Sharebnb.Models.Message(params);
      message.save({
        errors: function(model, response){
          response.responseJSON.forEach(function(response){
            $(".errors").append("<p>- " + response + "</p>")
          })
        }
      })
    } else {
      $(".errors").append("<p>- Log in or Sign Up To Make A Request</p> <p>- You can also sign in using a guest account</p>")
    }
  },

  render: function(){
    // this.model.blackedOutDates();
    var renderedContent = this.template({rental: this.model, images: this.model.images()});
    this.$el.html(renderedContent);
    this.$el.find(".date").datepicker({
      showOtherMonths: true,
      selectOtherMonths: true,
      autoclose: true,
      constrainInput: false,
      minDate: new Date()
    });
    return this
  }
})