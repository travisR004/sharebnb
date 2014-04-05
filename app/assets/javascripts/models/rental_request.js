window.Sharebnb.Models.RentalRequest = Backbone.Model.extend({
  urlRoot: "/api/rental_requests",

  parse: function(jsonResp){
    if(jsonResp.messages){
      this.messages().set(jsonResp.messages)
      delete jsonResp.messages
    }
    return jsonResp
  },

  messages: function(){
    if(!this._messages){
      this._messages = new Sharebnb.Collections.Messages();
    }
    return this._messages;
  }
})