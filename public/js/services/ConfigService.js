var app = angular.module('SampleApp',['ngRoute']);

angular.module('ConfigService', []).factory('configurationService', ['$http', function() {

  return {
    getPayer : getPayer,
    getAdmissions : getAdmissions,
    getBeds : getBeds,
    getContracts : getContracts
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

  function getAdmissions() {
    return [
      "Admit 24/h",
      "Admit from ER",
      "Admit prior to auth",
      "Epic Care Link"
    ];
  }

  function getBeds() {
    return [
      "Specialty Beds/Mattresses",
      "Contact isolation beds",
      "IP Hospice Beds"
    ];
  }

  function getContracts() {
    return [
      "SCM",
      "Bundle"
    ];
  }

}]);