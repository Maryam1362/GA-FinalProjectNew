var app = angular.module('SampleApp',['ngRoute']);
angular.module('SearchCtrl', []).controller('SearchController', function($scope, facilityService) {

	$scope.searchFacility = function() {
		facilityService.searchFacility($scope.facility, function(response){
  			$scope.CMP = response;
		});

	}

});