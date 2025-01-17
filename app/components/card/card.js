module = angular.module("card", []);
module.component("carddetails", {
    templateUrl: "/app/components/card/card.html",
    controller: function($scope, $routeParams, $http){

        $scope.prevCard = Number($routeParams.cardId) - 1;
        $scope.nextCard = Number($routeParams.cardId) + 1;

        $http.get(`${apiLink}/${$routeParams.cardId}?locale=en_US`, {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
        .then((response) => {
            if(response.status >= 200 && response.status < 300)
            {
                console.log(response.data);
                $scope.card = response.data;

                console.log($scope.card.rarityId)
                switch($scope.card.rarityId) {
                    case 1:
                        $scope.type= "Common"
                        break;
                    case 2:
                        $scope.type= "Free"
                        break;
                    case 3:
                        $scope.type = "Rare"
                        break;
                    case 4:
                        $scope.type = "Epic"
                        break;
                    case 5:
                        $scope.type = "Legendary"
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