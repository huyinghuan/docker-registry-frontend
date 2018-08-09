'use strict';

/**
 * @ngdoc function
 * @name docker-registry-frontend.controller:RepositoryListController
 * @description
 * # RepositoryListController
 * Controller of the docker-registry-frontend
 */
angular.module('login-controller', ['ui.bootstrap', 'ngResource'])
  .controller('LoginController', ['$scope',"$http", '$location', 
  function($scope, $http, $location){
    $scope.fobbidSign = false
    $scope.signin = ()=>{
      $scope.fobbidSign = true
      $scope.errorMsg = ""
      let username = $scope.username || ""
      let password = $scope.password || ""
      let postUsername = username.replace(/\s/g, "")
      let postPassword = password.replace(/\s/g, "")
      if(username != postUsername || password != postPassword){
        toastr.error( "username or password cannot contain space", "Error")
        $scope.fobbidSign = false
        return
      }
      if(!postUsername || !postPassword){
        toastr.warn( "username or password cannot be empty")
        return
      }
      $http({
        method: "POST",
        url: "/api/userinfo",
        headers: {"Content-Type": "application/json"},
        data: {
          username: postUsername,
          password: postPassword
        }
      }).success(()=>{
        $scope.fobbidSign = false
        toastr.success('Login success', 'System')
        $location.url("/home");
      }).error((data, status)=>{
        $scope.fobbidSign = false
        toastr(data, status)
      })
    }
  }]);
