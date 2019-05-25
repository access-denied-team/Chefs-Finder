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
			$scope.state = !$scope.state;
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
			alert('Username or Password is incorrect!')
			$scope.username1 = "";
			$scope.password1 = "";
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
			$scope.newmeal = "";
			$scope.desc = "";
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
				location:$scope.location.toUpperCase(),
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
	}
})



app.controller('Customerpage',function($scope,$http){
	$scope.chefLocation="";
	$scope.chefinformation="";
	$scope.mealinformation="";
   $scope.chefsByMeal=[]

	$scope.searchbymeal= function(){
		if($scope.mealSearch){
		$http({
			method: 'GET', 
			url: "/chefs/"+$scope.mealSearch,
			headers: {'Content-Type': "application/json; charset = utf-8"}
		}).then(function(response){
			if(response.data.length ==0){
				$scope.msg="Sorry, search again! "
				$scope.chefLocation=response.data
			}else{
			$scope.chefLocation=response.data
			$scope.msg=""}
		}).catch(function(err){
			console.log("error")
		})}
	}
           

	$scope.selectbar = function(){
		
		console.log($scope.location)
		$http({
			method: 'GET', 
			url: '/location/'+$scope.location.toUpperCase(),
			headers: {'Content-Type': "application/json; charset = utf-8"},
		}).then(function(response){
			$scope.chefLocation=response.data;
			console.log($scope.chefLocation)
			$scope.stateSearch = !$scope.stateSearch;
			$scope.state = !$scope.state;

		}).catch(function(err){
			console.log("error: " , err)
		})
	}
	
	$scope.chefinfo=function(name){

		$scope.state = !$scope.state;

		$scope.stateinfo = !$scope.stateinfo;

		console.log(name)
		$http({
			method:"GET",
			url:'/'+name,
			headers: {'Content-Type': "application/json; charset = utf-8"},
		}).then(function(response){
			$scope.chefinformation=response.data;
			$scope.stateInfo = !$scope.stateInfo;
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
});

app.directive('ngFiles', ['$parse', function ($parse) {

	function fn_link(scope, element, attrs) {
		var onChange = $parse(attrs.ngFiles);
		element.on('change', function (event) {
			onChange(scope, { $files: event.target.files });
		});
	};

	return {
		link: fn_link
	}
} ])



.controller('Fup', function ($scope,$rootScope, $http) {

	var formdata = new FormData();
	$scope.getTheFiles = function ($files) {
		angular.forEach($files, function (value, key) {
			formdata.append(key, value);
			console.log(key + ' ' + value.name);
		});


	};

	// NOW UPLOAD THE FILES.
	$scope.uploadFiles = function () {
		 console.log($scope.$parent.username);

		var request = {
			method: 'POST',
			url: '/fileupload/'+$scope.$parent.username,
			data: formdata,
			transformRequest: angular.identity,
			withCredentials: true,
			headers: {
				'Content-Type': undefined
			}

		};

		//SEND THE FILES.

		$http(request)
			.then(alert("uploaded") )


	 }
});
