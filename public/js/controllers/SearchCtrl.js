var app = angular.module('SampleApp',['ngRoute']);
angular.module('SearchCtrl', []).controller('SearchController',
	function($scope, facilityService, configurationService) {

	$scope.payerOptions = configurationService.getPayer();

	$scope.searchFacility = function() {
		facilityService.searchFacility($scope.facility, function(response){
  			$scope.CMP = response;
		});
	}

});
