var app = angular.module("myApp",[]);
app.controller("myCtr",['$scope',function($scope){
	$scope.clickme=function(){
		// $scope.updatname = name;
		// $scope.updatdesc = desc;
		// $location.path('login.html');
		 // window.location.href = 'https://www.facebook.com';
		  window.location.href = 'login.html';
	}
}]);

app.controller("signup",['$scope',function($scope){
	$scope.signup=function(){

		window.location.href = 'signup.html';
	}
}])

app.controller('Regester',function($scope,$http){
	$scope.Regester = function(){
		console.log($scope.username)
		$http({
			method:'post',
			url:'/signup',
			data:JSON.stringify({
				username:$scope.username,
				password:$scope.password,
				location:$scope.location,
				phoneNumber:$scope.phoneNumber,
				description:$scope.description,
				rating:$scope.rating,
				imgUrl:$scope.imgUrl
			}),
		headers: {'Content-Type': "application/json; charset = utf-8"}
		}).then(function(response){
			console.log(response.data)
			window.location.href = 'login.html';
			return 
		}).catch(function(){
			console.log('erooooor')
		})

// 	$http({
// 		method:'GET',
// 		url:'/all'
// 	}).then(function(response){
// 		console.log(response.data)	
// },function(error){
// 		console.log('errrrrrrrrrrrrrrrrrrrrrr')
// 	})
	}
})

app.controller('location', function($scope, $http){
	$scope.location = function(){
		$http({
			method: 'GET', 
			url: '/location/ ' + $scope.location,
			headers: {'Content-Type': "application/json; charset = utf-8"},
		}).then(function(res){
			res.send(res.data)
		}).catch(function(err){
			console.log('err:', err);
		});
	}
})