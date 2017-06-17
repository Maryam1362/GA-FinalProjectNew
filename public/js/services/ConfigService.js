var app = angular.module('SampleApp',['ngRoute']);

angular.module('ConfigService', []).factory('configurationService', ['$http', function() {

  return {
    getPayer : getPayer
  }

  function getPayer() {
    return [
      "Medicare",
      "Medicaid",
      "Aetna",
      "Anthem",
      "BDBS",
      "Carefirst",
      "Cigna",
      "Humana",
      "Innovation health",
      "Kaiser",
      "Tricare",
      "United",
      "Medicaid Pending"
    ];
  }
}]);