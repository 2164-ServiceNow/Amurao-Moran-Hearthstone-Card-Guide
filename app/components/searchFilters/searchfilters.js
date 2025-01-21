module = angular.module("searchfilters", [])
module.component("searchfilters",{
    templateUrl: "/app/components/searchFilters/searchfilters.html",
    controller: function($scope, searchService){
        $scope.updateFilters = function(){
            searchService.setCollectibles($scope.collectibles);
            searchService.setRarity($scope.rarity);
            searchService.setType($scope.cardtype);
        }

        $scope.rarities = [{"label":"--Select--", "value":" "}];
        slugs["rarities"].forEach(rarity => {
            $scope.rarities.push({
                label:rarity["name"],
                value:rarity["slug"]
            });
        })

        $scope.cardtypes = [{"label":"--Select--", "value":" "}];
        slugs["types"].forEach(cardtype => {
            $scope.cardtypes.push({
                label:cardtype["name"],
                value:cardtype["slug"]
            });
        })

        console.log($scope.cardtypes);
    }
})