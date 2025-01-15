module = angular.module("searchbar", [])
module.component("searchbar",{
    templateUrl: "app/components/searchBar/searchBar.html",
    controller: function($scope, searchBarService){
        $scope.searchinput = ""

        $scope.search = function(){
            searchBarService.setQuery($scope.searchinput)
        }
    }
})