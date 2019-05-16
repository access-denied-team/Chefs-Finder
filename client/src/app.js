const app = angular.module('main', ['ngRoute']);

app.config(function($route){
    $route
    .when('/', {
        templateUrl: 'index.html'
    }).otherWise({
        redirectTo: '/'
    });
});

app.controller('loginCtrl', function($scope, $location){
    $scope.login = function() {
        let username = $scope.username;
        let password = $scope.password;
        if(username === 'shareef' && password === '123'){ // username and password are for test only
            // $location.path('/');
            console.log('loggedin')
        }else{
            alert('Username or Password Incorrect!')
        }
    }
})