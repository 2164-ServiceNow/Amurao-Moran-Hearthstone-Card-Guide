module = angular.module("favorites", [])
module.component("favoritesbar",{
    template: `<span ng-repeat="(id, imgelem) in favoriteItems">
        <favoriteitem ng-click="favoriteItem(this)">
            <img ng-if="imgelem" src="{{imgelem}}"/>
            <span ng-if="!imgelem">{{id}}</span>
        </favoriteitem>
    </span>`,
    controller: function($scope, $location, favoritesService){
        $scope.$watch(favoritesService.getFavorites(), function(){
            $scope.favoriteItems = favoritesService.getFavorites();
            // console.log(favoritesService.getFavorites());
            // Object.keys(favoritesService.getFavorites()).forEach(id => {

            // })
        });

        $scope.favoriteItem = function(item)
        {
            console.log(item);
            $location.path(`/card/${item["id"]}`);
        }
    }
})