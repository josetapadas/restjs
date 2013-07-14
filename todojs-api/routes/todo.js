// Database configuration
var mongoDB = require('mongodb');

var mongo_server = new mongoDB.Server('localhost', 27017, {auto_reconnect: true});
var mongo_db = new mongoDB.Db('todojsdb', mongo_server);
var mongo_BSON = mongoDB.BSONPure;

mongo_db.open(function(e, db){
	if(!e) {
		console.log('[+] Connected to todojs database');
		db.collection('todos', {strict: true}, function(e, collection) {
			if(e) {
				console.log('[!] There are no items.');
			}
		});
	}
});

// database queries and API reply handers
exports.getAllItems = function(req, res) {
	console.log('[+] Getting all items.');
	mongo_db.collection('todos', function(e, collection) {
		collection.find().toArray(function(e, items) {
			res.send(items);
		});
	});	
};

exports.getItemByID = function(req, res) {
	var id = req.params.id;
	console.log('[+] Getting todo item: ' + id);
	mongo_db.collection('todos', function(e, collection) {
		collection.findOne({'_id':new mongo_BSON.ObjectID(id)}, function(e, item) {
			res.send(item);	
		});
	});	
};

exports.updateItem = function(req, res) {
	var id = req.params.id;
	var content = req.body;
	console.log('[+] Updating todo item: ' + id);
	mongo_db.collection('todos', function(e, collection) {
		collection.update({'_id':new mongo_BSON.ObjectID(id)}, content, function(e, item) {
			if(e) {
				res.send({error:'error-updating'});
			} else {
				res.send(item);	
			}
		});
	});	
};

exports.deleteItem = function(req, res) {
	var id = req.params.id;
	
	console.log('[+] Deleting todo item: ' + id);
	mongo_db.collection('todos', function(e, collection) {
		collection.remove({'_id':new mongo_BSON.ObjectID(id)}, function(e, item) {
			if(e) {
				res.send({error:'error-updating'});
			} else {
				res.send(item);	
			}
		});
	});	
};

exports.addItem = function (req, res) {
	var item = req.body;
	console.log('[+] Adding item: ' + JSON.stringify(item));
	mongo_db.collection('todos', function(e, collection) {
		collection.insert(item, [{safe:true}], function(e, result) {
			if(e) {
				res.send({error:'error-inserting'});
			} else {
				console.log('[+] Inserted: ' + JSON.stringify(result[0]));
				res.send[result[0]];
			}
		});
	});
}



