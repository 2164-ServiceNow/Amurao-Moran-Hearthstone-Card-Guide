module = angular.module("favorites", [])
module.component("favoritesbar",{
    template: `<span ng-repeat="item in favoriteItems">
        <favoriteitem ng-click="favoriteItem(this)">{{item}}</favoriteitem>
    </span>`,
    controller: function($scope, $location, favoritesService){
        $scope.$watch(favoritesService.getFavorites(), function(){
            $scope.favoriteItems = favoritesService.getFavorites();
            console.log($scope.favoriteItems);
        });

        $scope.favoriteItem = function(item)
        {
            $location.path(`/card/${item["item"]}`);
        }
    }
})