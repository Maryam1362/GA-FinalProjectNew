function AppCtrl($scope, $http){
	console.log("Hello world from Controller");

    // $http.get('/data').success(function(response){

    //   console.log("I got the data I requested.");
    //   $scope.CMP = response;
    //   console.log($scope.CMP)

    // });
    var refresh = function() {
	    $http.get('/data').success(function(response) {
	    console.log("I got the data I requested");
	    $scope.CMP = response;
	    $scope.facility= "";
	  });
 	};
refresh();

    $scope.addFacility = function(){
	    console.log($scope.facility);
	    $http.post("/data", $scope.facility).success(function(response){
	    console.log(response);
	    refresh();
    });
	}
	$scope.remove = function(id){
     console.log(id);
     $http.delete("/data/"+ id).success(function(response){
      refresh();
     });
	}
	$scope.edit = function(id) {
  console.log(id);
  $http.get('/data/' + id).success(function(response) {
    $scope.facility = response;
  });
};  
$scope.update = function() {
  console.log($scope.facility._id);
  $http.put('/data/' + $scope.facility._id, $scope.facility).success(function(response) {
    refresh();
  })
};
$scope.deselect = function() {
  $scope.facility = "";
}

}