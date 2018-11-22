var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var db=require('./models/db.js');
var routes=require('./routes/route.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.get('/', function(req,res) {
    res.sendFile('public/index.html');
});
//adding login credentials
app.post('/adduser', routes.postUserData);
app.post('/deleteuser', routes.postDeleteData);
app.post('/update', routes.updateUserData);
app.get('/searchUser/:id', routes.searchUser);
// app.post('/sendreview', routes.postreview);
// app.get('/getusers', routes.getUsersList);
// app.get('/getreview', routes.getReview);
//getting the port to run the application
var port = process.env.PORT || 8080;
//displying port in the console and adding th port to listen
var server=app.listen(port,function(req,res){
    console.log("http://localhost:"+port);
});
