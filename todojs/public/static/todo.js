// the todojs item model
var TodoItem = Backbone.Model.extend({});

// the todojs item view
var TodoView = Backbone.View.extend({
	render: function(){
		var html = '<h3>' + this.model.get('name') + '</h3>';
		$(this.el).html(html);
	}
});