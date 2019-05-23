 
 var app = angular.module("Chef",["ngRoute",'ngMaterial', 'ngMessages']);
 app.config(["$routeProvider",'$locationProvider',function($routeProvider,$locationProvider){
  
  $locationProvider.html5Mode(true);
 
	$routeProvider
	.when("/chefsbylocation",{
		templateUrl:"/chefsByLocation.html",
		controller:"chefsByLocation"
	})
 .when("/login",{
    templateUrl:"/login.html",
    controller:"login",
    
})
.when("/search.html", {
  template: "/search.html",
  controller: "filterByLocation"
})
.when("/profile",{
    templateUrl:"/profileChef.html",
    controller:"profile"
})

 }])
 
 //profile ctrl
 .controller("profile",function($scope,$rootScope) {
    $scope.data = $rootScope.data
    $scope.imagePath = '/chef-hat-outline-symbol.svg';
  })

  app.controller("filterByLocation", function($scope){
    $scope.locations = ['Amman', 'Irbid', 'Aqaba', 'Zarqa']
  })
 
	//login ctrl
 .controller("login",function($scope,$http,$location,$rootScope){
    
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
            $rootScope.data = response.data[0]
            $location.path("/profile")
            
		}).catch(function(){
			console.log('big error')
		})
	}


    
})

.controller("chefsByLocation",function($http,$scope,$location){
	$scope.reigon="Irbid";
	$scope.chefsByLocation=[]

	$scope.selectRegion =function(){
	$http({
			method:'get',
			url:`/location/${$scope.reigon}`,
		headers: {'Content-Type': "application/json; charset = utf-8"}
		}).then(function(response){
				console.log(response.data)
            $scope.chefsByLocation=response.data
            $location.path("/chefsbylocation")
            }).catch(function(){
			console.log('big error')
		})
	}

	}
)






