var chalk = require('chalk');
var mongoose = require( 'mongoose' );

var dbURI = 'mongodb://localhost:27017/trainingManagement';

mongoose.connect(dbURI,{ useNewUrlParser: true });
mongoose.connection.on('connected', function () {
    console.log(chalk.green('Mongoose connected to ' + dbURI));
  });
  
  mongoose.connection.on('error',function (err) {
    console.log(chalk.red('Mongoose connection error: ' + err));
  });
  
  mongoose.connection.on('disconnected', function () {
    console.log(chalk.red('Mongoose disconnected'));
  });
  var traineeModel = new mongoose.Schema({
    username: {type: String},
    Assignment1: {type: Object},
    Assignment2: {type: Object},
    Assignment3: {type: Object},
    Assignment4: {type: Object},
    Assignment5: {type: Object},
    Assignment6: {type: Object},
    Assignment7: {type: Object},
    Assignment8: {type: Object},
    Assignment9: {type: Object},
    Assignment10: {type: Object},
    Assignment11: {type: Object},
    Assignment12: {type: Object}
  },{collection: 'traineescollection'});

  mongoose.model( 'traineeSchema', traineeModel);
  
  