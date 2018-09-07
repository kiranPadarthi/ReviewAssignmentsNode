const mongoose = require("mongoose");
const traineemang = mongoose.model("traineeSchema");

exports.postUserData = function(req, res) {
  var username = req.body.searchQuery;
  var newTrainee = new traineemang();
  newTrainee.username = username;
  newTrainee.save(function(err, record) {
    if (record) res.status(201).send(record);
  });
};
exports.updateUserData = function(req, res) {
  var newTrainee = new traineemang();
  traineemang.update({ username: req.body.username }, req.body, function(err,record) {
    if (record) res.status(201).send(record);
    else res.status(201).send("Record not found");
  });
};
exports.postDeleteData = function(req, res) {
  traineemang.remove({ username: req.body.searchQuery }, function(err, record) {
    res.status(201).send("Record deleted.");
  });
};
exports.searchUser = function(req, res) {
  traineemang.findOne({ username: req.params.id }, function(err, record) {
    if (record) res.status(201).send(record);
    else res.status(201).send("Record not found");
  });
};
