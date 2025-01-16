module = angular.module("favorites", [])
module.component("favoritesbar",{
    template: `<span ng-repeat="item in favoriteItems">
        {{item}}
    </span>`,
    controller: function($scope){
        $scope.favoriteItems = localStorage.favorite ? localStorage.favorite : [];
    }
})