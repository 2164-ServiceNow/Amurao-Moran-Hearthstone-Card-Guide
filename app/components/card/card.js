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
            }
            else
            {
                console.log("API sad: " + response.statusText);
            }
        });
    }
})