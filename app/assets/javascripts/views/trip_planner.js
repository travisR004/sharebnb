window.Sharebnb.Views.TripPlanner = Backbone.View.extend({
	initialize: function(options){
		this.user = options.user;
		this.favorites = options.favorites
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.favorites, "sync", this.render)

	},

	template: JST["favorite_rentals/favorite_rentals"],

	makeSortable: function(){
		var tripPlan = this;
		$(".favorites").sortable({})
			// update: function(event, ui, list){
// 				var prevRank = ui.item.prev().data("rank");
// 				var nextRank = ui.item.next().data("rank");
//
// 				if( prevRank && nextRank){
// 					var avgRank = (prevRank + nextRank) / 2
// 				} else if( prevRank ){
// 					var avgRank = prevRank + 1
// 				} else {
// 					var avgRank = nextRank / 2
// 				}
//
// 				var image = rentalView.model.images().getOrFetch(ui.item.data("id"));
// 				image.save({rank: avgRank})
// 			}
// 		});
	},

	render: function(){
		var renderedContent = this.template({rentals: this.favorites})
		this.$el.html(renderedContent)
		return this
		this.makeSortable();
	}
})