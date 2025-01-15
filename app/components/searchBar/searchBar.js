let module = angular.module("searchbar", [])
module.component("searchbar",{
    templateURL: "app/components/searchBar/searchBar.html",
    controller: function($scope, searchBarService){
        // $scope.searchInput = ""

        // $scope.search = function (){
        //     searchBarService.setQuery($scope.searchInput)
        // }
    }
})