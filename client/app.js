 
 var app = angular.module("Chef",["ngRoute"]);
 app.config(["$routeProvider",'$locationProvider',function($routeProvider,$locationProvider){
  
  $locationProvider.html5Mode(true);
 
  $routeProvider
 .when("/login",{
    templateUrl:"/login.html",
    controller:"login",
    
})
.when("/profile",{
    template:"{{data[0].username}}",
    controller:"profile"
})
.when("/search", {
  templateUrl: "search.html",
  controller: "FilterLocation",
})

 }]).controller("profile",function($scope, save) {
    $scope.data = save.myFuncget();
  })

app.controller('FilterLocation', function($scope){
    $scope.locations = ["Amman", "Irbid", "Aqaba"];
})

 .controller("login",function($scope,save,$http,$location,$routeParams){
    
    $scope.login=function(){
		
		$http({
			method:'post',
			url:'/login',
			data:JSON.stringify({
				username:$scope.username,
				password:$scope.password
			}),
		headers: {'Content-Type': "application/json; charset = utf-8"}
		}).then(function(response){
            save.myFuncset(response.data)
            $location.path("/profile")
            
		}).catch(function(){
			console.log('big error')
		})
	}


    
});


app.service('save', function() {
    this.data;
    this.myFuncset = function (x) {
        this.data=x
    }

    this.myFuncget = function () {
      return this.data;
    }
  });




