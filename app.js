var app = angular.module("applicant", []);
app.controller("applicantcontroller", function($scope,$http) {
    $scope.applicants =[];
    $scope.applicant = {
        FullName:"",
        Email:"",
        Zno:""
    };

    $scope.getApplicants = function(){
        $http({
            url: '/getApplicants/',
            method: "GET",
           
        }).success(function (res) {
            $scope.applicants = res;
        }).error(function (er) {

        });
    }
        $scope.getApplicants();
        $scope.postApplicant = function(){

      if($scope.applicant.FullName && $scope.applicant.Email && $scope.applicant.Zno){

        $http({
            url: '/postApplicants/',
            method: "Post",
            data: $scope.applicant,
            headers: {
                'Content-Type': 'application/json'
            }
           
        }).success(function (res) {
            $scope.applicants.push(res);
        }).error(function (er) {

        });
        }
    }
})
