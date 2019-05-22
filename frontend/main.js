var app = angular.module("myApp",[]);
app.service('Data',function(){
	function Data(){
		console.log('Data')
	}
})
app.controller("myCtr",['$scope',function($scope){
	$scope.clickme=function(){
		  window.location.href = 'login.html';
	}
	$scope.Customer = function(){
		  window.location.href = 'customers.html';	
	}
}]);



app.controller("signup",function($scope,$http,$rootScope,Data){
	$scope.chefName = ""
	$scope.chefMeal = []

	$scope.signup=function(){

		window.location.href = 'signup.html';
	}
	$scope.login=function(){
		console.log("hello oday")
		$scope.state = !$scope.state;
		$http({
			method:'post',
			url:'/login',
			data:JSON.stringify({
				username:$scope.username1,
				password:$scope.password1
			}),
		headers: {'Content-Type': "application/json; charset = utf-8"}
		}).then(function(response){
			console.log(response);
			$scope.chefName=response.data[0];
			console.log($scope.chefName);

		}).then(function(){
				$http({
					method:'GET',
					url:'/'+$scope.username1+"/meal"
				}).then(function(response){
					console.log(response.data)	
					$scope.chefMeal = response.data
					},function(error){
					console.log('errrrrrrrrrrrrrrrrrrrrrr')
				})
		}).catch(function(){
			window.location.href = 'profile.html';
		})
	}
		$scope.create=function(){
			$http({
			method:'post',
			url:'/'+$scope.username1+'/meal',
			data:JSON.stringify({
				name:$scope.newmeal,
				description:$scope.desc
			}),
		headers: {'Content-Type': "application/json; charset = utf-8"}
		}).then(function(response){
			$scope.chefMeal.push(response.data);
		}).catch(function(){
			console.log("error in create meal")
		})
	}
})

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

app.controller('Customerpage',function($scope,$http){
	$scope.chefLocation="";
	$scope.chefinformation="";
	$scope.mealinformation="";
	$scope.selectbar = function(){
		console.log($scope.location)
		$http({
			method: 'GET', 
			url: '/location/'+$scope.location,
			headers: {'Content-Type': "application/json; charset = utf-8"},
		}).then(function(response){
			$scope.chefLocation=response.data
			console.log($scope.chefLocation)
		}).catch(function(err){
			console.log("error")
		})
	}
	$scope.chefinfo=function(name){
		
		$scope.state = !$scope.state;
		console.log(name)
		$http({
			method:"GET",
			url:'/'+name,
			headers: {'Content-Type': "application/json; charset = utf-8"},
		}).then(function(response){
			$scope.chefinformation=response.data;
			console.log($scope.chefinformation)
		}).then(function(){
			$http({
				method:'GET',
				url:'/'+name+'/meal',
				headers: {'Content-Type': "application/json; charset = utf-8"},
				}).then(function(res){
					console.log(res.data)
					$scope.mealinformation=res.data;
			
				}
			)
		})
		
	}
})
