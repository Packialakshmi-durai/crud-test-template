
var myapp=angular.module("myapp",[]);

myapp.controller("fristcontroller",function($scope,$http, $location){

			$scope.newuser={};
			$scope.edituser={};
			$scope.message=""

			$http({
		        method: 'GET',
		        url: 'http://localhost:4000/employeetable',
		  
		      }).then(function sappuccess(response) {
		        $scope.users=response.data
		      }, function error(response) {
		        console.log("error")
		      })    

			
			$scope.saveuser=function(){

				$scope.users.push($scope.newuser)
				$http.post('http://localhost:4000/employeetablePush', $scope.newuser)
				$scope.message="New User Added Successfully!"
			};

		
			$scope.selectuser=function(userdata){
				$scope.edituser=userdata;
			};

			$scope.deleteuser=function(name){
				var username={"username":$scope.edituser.username}
				console.log(username)
				$http.post('http://localhost:4000/delete', username)
				
				$scope.message="User Deleted Successfully!"
			}

			$scope.updateuser=function(editdata){//
				 $http.post('http://localhost:4000/update', editdata)
				$scope.message="User Updaed Successfully!"
			}

});


















