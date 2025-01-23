module = angular.module("card", []);
module.component("carddetails", {
    templateUrl: "/app/components/card/card.html",
    controller: function($scope, $routeParams, $http, $location, favoritesService){
        $scope.backToSearch = function()
        {
            $location.path("/");
        }

        $scope.prevCard = function()
        {
            $location.path(`/card/${Number($routeParams.cardId) - 1}`);
        }

        $scope.nextCard = function()
        {
            $location.path(`/card/${Number($routeParams.cardId) + 1}`);
        }

        $scope.favoriteCard = function()
        {
            favoritesService.addFavorite($routeParams.cardId);
            $scope.isFavorite = favoritesService.isFavorite($routeParams.cardId);
        }

        $scope.unFavoriteCard = function()
        {
            favoritesService.removeFavorite($routeParams.cardId);
            $scope.isFavorite = favoritesService.isFavorite($routeParams.cardId);
        }


        $scope.isFavorite = favoritesService.isFavorite($routeParams.cardId);

        $http.get(`${apiLink}/${$routeParams.cardId}?locale=en_US`, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then((response) => {
            if(response.status >= 200 && response.status < 300)
            {
                $scope.card = response.data;
                slugs["minionTypes"].forEach(minionType => {
                    if(minionType["id"] == $scope.card.minionTypeId)
                    {
                        $scope.card.minionTypeId = minionType["name"];
                    }
                })
                slugs["rarities"].forEach(rarity => {
                    if(rarity["id"] == $scope.card.rarityId)
                    {
                        $scope.card.rarityId = rarity["name"];
                        $scope.card.craftingCost = `${rarity["craftingCost"][0]} Regular, ${rarity["craftingCost"][1]} Golden`; 
                        $scope.card.dustValue = `${rarity["dustValue"][0]} Regular, ${rarity["dustValue"][1]} Golden`; 
                    }
                })
            }
            else
            {
                console.log("API sad: " + response.statusText);
            }
        });
    }
})