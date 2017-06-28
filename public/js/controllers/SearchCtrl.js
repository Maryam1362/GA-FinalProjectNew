var app = angular.module('SampleApp',['ngRoute', 'btorfs.multiselect']);
angular.module('SearchCtrl', []).controller('SearchController',
	function($scope, facilityService, configurationService) {

	$scope.payerOptions = configurationService.getPayer();
	$scope.AdmissionsOptions = configurationService.getAdmissions();
	$scope.BedOptions = configurationService.getBeds();
	$scope.contractOptions = configurationService.getContracts();

	$scope.searchFacility = function() {
		facilityService.searchFacility($scope.facility, function(response){
  			$scope.CMP = response;
		});
	}

});