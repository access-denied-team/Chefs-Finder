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
		alert('tl7as')
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
		}).then(function(data){
			console.log(data.username)
			return data;
		}).catch(function(){
			console.log('errooooor')
		})
	}
})