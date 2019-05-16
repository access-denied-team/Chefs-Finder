const app = angular.module('main', []);

app.controller('loginCtrl', function($scope){
    $scope.login = function() {
        let username = $scope.username;
        let password = $scope.password;
        console.log(username)
    }
})