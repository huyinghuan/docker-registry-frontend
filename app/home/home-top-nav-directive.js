'use strict';

const template = `
<nav class="navbar navbar-default">
<div class="container-fluid">
  <!-- Brand and toggle get grouped for better mobile display -->
  <div class="navbar-header">
    <a class="navbar-brand" href="#">Docker Registry Frontend</a>
  </div>

  <!-- Collect the nav links, forms, and other content for toggling -->
  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <!--
    <ul class="nav navbar-nav">
      <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
      <li><a href="#">Link</a></li>
    </ul>
    -->
    <ul class="nav navbar-nav navbar-right">
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{getUsername(username)}} <span class="caret"></span></a>
        
        <ul class="dropdown-menu">
          <li ng-if="logined"><a href="#">注销</a></li>
          <li ng-if="!logined"><a href="#">登陆</a></li>
        </ul>
        
      </li>
    </ul>
  </div><!-- /.navbar-collapse -->
</div><!-- /.container-fluid -->
</nav>
`

angular.module('home-top-nav-directive', ['ngResource'])
  .directive('homeTopnav',["$resource", function($resource){
    return {
      restrict: 'E',
      template: template,
      replace: true,
      link:($scope)=>{
        
        $scope.username = ""
        $scope.logined = false
        $scope.getUsername = (name)=>{
            if(name == ""){
                return "未登陆"
            }
            return name
        } 
        var loadUserInfo = ()=>{
            $resource("/api/userinfo").get((userinfo)=>{
                $scope.username = userinfo.username
                if(userinfo.username){
                    $scope.logined = true
                }else{
                    $scope.logined = false
                }
            })
        }
        loadUserInfo()
      }
    };
  }]);
