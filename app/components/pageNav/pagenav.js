module = angular.module("pageNav", [])
module.component("pagenav",{
    templateUrl: "/app/components/pageNav/pagenav.html",
    controller: function($scope, searchService){
        $scope.page = searchService.getPage();
        $scope.prevPage = function(){
            searchService.prevPage();
            $scope.page = searchService.getPage();
        }
        $scope.nextPage = function(){
            searchService.nextPage();
            $scope.page = searchService.getPage();
        }
        $scope.$watch( function(){ return searchService.getPage() }, function(){
            $scope.page = searchService.getPage();
        });
    }
})