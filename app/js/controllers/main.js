'use strict';

/**
 * @ngdoc function
 * @name handsOnUnitTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the handsOnUnitTestApp
 */
handson.app.controller('MainCtrl', function ($scope,userService) {

    $scope.loaded=false;
    $scope.filterValue="";
    $scope.userService=userService;
    userService.getUsers().then(function (response) {
        $scope.loaded=true;
    });

    $scope.filterList=function(filterValue){
        var value = filterValue || $scope.filterValue;
        userService.filterByName(value);
    }
});
