nimbleModule.controller("issuesController", function($scope) {
    $scope.todoMsg = "TODO";
})
.directive("NimbleIssues", function() {
    return {
        restrict: "E",
        templateUrl: "/partials/issues.html"
    };
});