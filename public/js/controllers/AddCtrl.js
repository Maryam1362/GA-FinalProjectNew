var app = angular.module('SampleApp',['ngRoute']);

angular.module('AddCtrl', []).controller('AddController', function($scope, facilityService) {
	console.log("Hello world from Controller");

	facilityService.load(function(response){
	    console.log("I got the data I requested.");
	    $scope.CMP = response;
	    console.log($scope.CMP);
    });
    
	$scope.refresh = function() {
		facilityService.refresh(function(response) {
	    	console.log("I got the data I requested");
	    	console.log(response);
	    	$scope.CMP = response;
	    	$scope.facility= "";
		});
	}	
    $scope.refresh();
    
    $scope.addFacility = function() {
    	facilityService.addFacility($scope.facility, function(response){
	    	console.log(response);
	    	$scope.refresh();
		});
    }

    $scope.removeFacility = function(id) {
    	facilityService.removeFacility(id, $scope.refresh);
    }

    $scope.editFacility = function(id) {
    	facilityService.editFacility(id, function(response) {
    		$scope.facility = response;
    	});
    }

	$scope.updateFacility = function() {
		facilityService.updateFacility($scope.facility, $scope.refresh);
	} 

	$scope.deselectFacility = function() {
	  $scope.facility = "";
	}

});