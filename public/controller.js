var myApp = angular.module("myApp", []);
myApp.controller("AppCtrl", [
  "$scope",
  "$http",
  function($scope, $http) {
    $scope.searchQuery = "";
    $scope.isFound = true;
    $scope.viewDetailsFlag = false;
    $scope.currentSelection = "";
    $scope.viewSearchDet = false;
    $scope.showModal = false;
    $scope.dataSet = [];
    $scope.assignmentCodes = {
      model: null,
      availableAssignments: [
        { id: "1", name: "Assignment 1-1" },
        { id: "2", name: "Assignment 1-2" },
        { id: "3", name: "Assignment 2-1" },
        { id: "4", name: "Assignment 2-2" },
        { id: "5", name: "Assignment 3-1" },
        { id: "6", name: "Assignment 3-2" },
        { id: "7", name: "Assignment 4-1" },
        { id: "8", name: "Assignment 4-2" },
        { id: "9", name: "Assignment 5-1" },
        { id: "10", name: "Assignment 5-2" },
        { id: "11", name: "Assignment 6-1" },
        { id: "12", name: "Assignment 6-2" }
      ]
    };
    $scope.updateDetails = {
      UIScore: 0,
      JSScore: 0,
      LogicScore: 0
    };
    $scope.sendMail = function(assignmentCode, UI, JS, Logical) {
      var body =
        assignmentCode +
        " results: %0D%0A%0D%0A " +
        "User Interface Score : " +
        UI +
        "%0D%0A JavaScript Score : " +
        JS +
        "%0D%0A Logical Score : " +
        Logical +
        "%0D%0A";
      var subject = "SAPUI5 Training " + assignmentCode + " Score";
      window.open(
        "mailto:" +
          $scope.currentSelection.mail +
          "?subject=" +
          subject +
          "&body=" +
          body
      );
    };
    $scope.loadCanvas = function() {
      var ctx = document.getElementById("pieChart").getContext("2d");
      var chart = new Chart(ctx, {
        type: "pie",
        data: {
          datasets: [
            {
              data: $scope.dataSet,
              backgroundColor: [
                "rgba(255, 99, 132)",
                "rgba(54, 162, 235)",
                "rgba(255, 206, 86)"
              ],
              borderColor: [
                "rgba(255, 99, 132)",
                "rgba(54, 162, 235)",
                "rgba(255, 206, 86)"
              ]
            }
          ],
          labels: ["User Interface", "JavaScript", "Logical"]
        },
        options: {}
      });
    };
    $scope.sendUpdate = function() {
      $scope.scoreDetails = {};
      var scores = $scope.updateDetails;
      var assignmentcode = "Assignment" + $scope.assignmentCodes.model;
      $scope.scoreDetails[assignmentcode] = $scope.updateDetails;
      $scope.scoreDetails.username = $scope.currentSelection.username;
      $http.post("/update", $scope.scoreDetails).then(function(response) {
        $("#updateModal").modal("hide");
        $scope.searchUser();
        $scope.getNotification(
          "Success: ",
          "Scores updated successfully.",
          "success"
        );
      });
    };
    $scope.deleteUser = function() {
      $http
        .post("/deleteuser", { searchQuery: $scope.searchQuery })
        .then(function(response) {
          $scope.searchQuery = "";
          $scope.isFound = true;
          $scope.viewDetailsFlag = false;
          $scope.viewSearchDet = false;
          $scope.getNotification(
            "Success: ",
            "User deleted successfully.",
            "success"
          );
        });
    };
    $scope.addUser = function() {
      $http
        .post("/adduser", { searchQuery: $scope.searchQuery })
        .then(function(response) {
          $scope.isFound = true;
        });
    };
    $scope.onload = function() {
      $("#idSearchInput").keyup(function() {
        var scope = angular.element($("#outer")).scope();
        scope.isFound = true;
        $scope.viewDetailsFlag = false;
        $scope.viewSearchDet = false;
      });
    };
    $scope.viewDetails = function() {
      $scope.viewSearchDet = true;
    };
    $scope.updateScores = function() {
      $scope.showModal = true;
    };
    $scope.searchUser = function() {
      $http.get("/searchUser/" + $scope.searchQuery).then(
        function(response) {
          if (response && response.data === "Record not found") {
            $scope.isFound = false;
            $scope.getNotification(
              "Error: ",
              "User not found, please add the user.",
              "danger"
            );
          } else {
            $scope.isFound = true;
            $scope.viewDetailsFlag = true;
            $scope.getNotification(
              "Success: ",
              "User found successfully.",
              "success"
            );
          }
          $scope.currentSelection = response.data;
          $scope.scores = [];
          $.each($scope.currentSelection, function(index, value) {
            if (typeof value === "object") {
              value.assignmentCode = index;
              $scope.scores.push(value);
            }
          });
          var averageArr = [[], [], []];
          var j = 0;
          $.each($scope.scores, function(index, value) {
            var i = 0;
            averageArr[i][j] = value.UIScore;
            averageArr[i + 1][j] = value.JSScore;
            averageArr[i + 2][j] = value.LogicScore;
            j++;
          });
          $scope.dataSet = [];
          $scope.dataSet.push(
            averageArr[0].reduce(function(acc, initialVal) {
              return parseInt(acc) + parseInt(initialVal);
            }) / averageArr[0].length
          );
          $scope.dataSet.push(
            averageArr[1].reduce(function(acc, initialVal) {
              return parseInt(acc) + parseInt(initialVal);
            }) / averageArr[1].length
          );
          $scope.dataSet.push(
            averageArr[2].reduce(function(acc, initialVal) {
              return parseInt(acc) + parseInt(initialVal);
            }) / averageArr[2].length
          );
        },
        function(error) {
          console.log(error);
        }
      );
    };
    $scope.getNotification = function(title, message, stuats) {
      $.notify(
        {
          title: title,
          message: message
        },
        {
          // settings
          element: "body",
          position: null,
          type: stuats,
          allow_dismiss: false,
          newest_on_top: false,
          showProgressbar: false,
          placement: {
            from: "bottom",
            align: "center"
          },
          offset: 20,
          spacing: 10,
          z_index: 1031,
          delay: 2500,
          timer: 1000,
          mouse_over: null,
          animate: {
            enter: "animated fadeInDown",
            exit: "animated fadeOutUp"
          }
        }
      );
    };
  }
]);
