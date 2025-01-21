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

                switch($scope.card.rarityId) {
                    case 1:
                        $scope.type= "Common"
                        $scope.craftcost = 40
                        break;
                    case 2:
                        $scope.type= "Free"
                        $scope.craftcost = 0
                        break;
                    case 3:
                        $scope.type = "Rare"
                        $scope.craftcost = 100
                        break;
                    case 4:
                        $scope.type = "Epic"
                        $scope.craftcost = 400
                        break;
                    case 5:
                        $scope.type = "Legendary"
                        $scope.craftcost = 1600
                        break;                      
                }
            }
            else
            {
                console.log("API sad: " + response.statusText);
            }
        });
    }
})