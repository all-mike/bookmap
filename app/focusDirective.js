
  var app = angular.module('hotmap');
  // var ModalDemoCtrl = function ($scope) {

  //   $scope.open = function () {
  //     $scope.shouldBeOpen = true;
  //   };

  //   $scope.close = function () {
  //     $scope.closeMsg = 'I was closed at: ' + new Date();
  //     $scope.shouldBeOpen = false;
  //   };
  // };

app.directive('focusMe', function($timeout) {
  return {
    scope: { trigger: '@focusMe' },
    link: function(scope, element) {
      scope.$watch('trigger', function(value) {
        if(value === "true") { 
          $timeout(function() {
            element[0].focus(); 
          });
        }
      });
    }
  };
});
