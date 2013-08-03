// init express.js framwork
var express = require('express');
var app = express();

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
});

app.get("/", function(req, res) {
  res.redirect("/index.htm");
});

// todojs API
var todojs = require('./routes/todo');


// le todojs REST calls handlers
app.get('/todojs', todojs.getAllItems);
app.get('/todojs/:id', todojs.getItemByID);
app.put('/todojs/:id', todojs.updateItem);
app.delete('/todojs/:id', todojs.deleteItem);
app.post('/todojs', todojs.addItem);


// start server
app.listen(8080);
console.log('[!] todojs API server started.')
