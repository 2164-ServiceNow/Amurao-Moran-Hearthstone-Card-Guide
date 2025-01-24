module = angular.module("searchbar", [])
module.component("searchbar",{
    templateUrl: "/app/components/searchBar/searchBar.html",
    controller: function($scope, searchService){
        $scope.searchInput = searchService.getQuery();

        $scope.search = function()
        {
            searchService.setQuery($scope.searchInput);
            searchService.setPage(1);
            searchService.toggleSearch();
        }
    }
})