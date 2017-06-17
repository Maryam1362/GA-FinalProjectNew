
var app = angular.module('SampleApp',['ngRoute']);

angular.module('AddService', []).factory('facilityService', ['$http', function($http) {
    
    return {
        load: load,
        refresh: refresh,
        addFacility: addFacility,
        removeFacility: removeFacility,
        editFacility: editFacility,
        updateFacility: updateFacility,
        searchFacility: searchFacility
    }

    function load(successFunction) { 
        return $http.get('/data').success(successFunction);
    }   

    function refresh(successFunction) {
        return load(successFunction);
    }

    function addFacility(facility, successFunction) {
        return $http.post("/data", facility).success(successFunction);
    }

    function removeFacility(id, successFunction) {
       return $http.delete("/data/"+ id).success(successFunction);
    }
   
    function editFacility(id, successFunction) {
       return $http.get('/data/' + id).success(successFunction);
    }

    function updateFacility(facility, successFunction) {
        return $http.put('/data/' + facility._id, facility).success(successFunction);
    }

    function searchFacility(facility, successFunction) {
        return $http.post("/search", facility).success(successFunction);
    }

}]);