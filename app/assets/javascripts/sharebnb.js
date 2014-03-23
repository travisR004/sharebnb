window.Sharebnb = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
	Data: {},
  initialize: function() {
		window.Sharebnb.Data.rentals = new Sharebnb.Collections.Rentals();
		new Sharebnb.Routers.AppRouter();
		Backbone.history.start();
  }
};

$(document).ready(function(){
  Sharebnb.initialize();
});

Backbone.CompositeView = Backbone.View.extend({
  addSubview: function(selector, subview){
    var selectorSubviews =
    this.subviews()[selector] || (this.subviews()[selector] = []);

    selectorSubviews.push(subview);
    var $selectorEl = this.$(selector);
    $selectorEl.append(subview.$el)
  },

  remove: function(){
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function(selectorSubviews, selector){
      _(selectorSubviews).each(function(subview){
        subview.remove();
      });
    });
  },

  removeSubview: function (selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    var subviewIndex = selectorSubviews.indexOf(subview);
    selectorSubviews.splice(subviewIndex, 1);
    subview.remove();
  },

  renderSubviews: function(){
    var view = this;
    _(this.subviews()).each(function (selectorSubviews, selector){
      var $selectorEl = view.$(selector);
      $selectorEl.empty();

      _(selectorSubviews).each(function(subview){
        $selectorEl.append(subview.render().$el);
        subview.delegateEvents();
      });
    });
  },

  subviews: function() {
    if (!this._subviews){
      this._subviews = {}
    }

    return this._subviews;
  }
});