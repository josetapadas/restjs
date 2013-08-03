// the todojs item model
var TodoItem = Backbone.Model.extend({});

// the todojs item view
var TodoView = Backbone.View.extend({
	render: function(){
		var html = '<h3>' + this.model.get('name') + '</h3>';
		$(this.el).html(html);
		return this
	}
});

// the todojs collection
var TodoList = Backbone.Collection.extend({
	model: TodoItem,
	url: '/todojs'
});

var TodoListView = Backbone.View.extend({
	initialize: function() {
		this.collection.on('add', this.addItem, this);
		this.collection.on('reset', this.addAllItems, this);
	},
	addItem: function(item){
			var todoView = new TodoView({model:item});
			this.$el.append(todoView.render().el);
	},
	addAllItems: function(){
		this.collection.forEach(this.addItem, this);
	},
	render: function() {
		this.addAllItems();	
	}
});