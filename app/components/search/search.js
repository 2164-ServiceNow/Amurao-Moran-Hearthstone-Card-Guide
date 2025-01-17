let module = angular.module("search", ["searchbar"]);
module.component("results", {
    template:
    `<span ng-repeat="card in cards">
        <img ng-click="redirectCard(this)" src="{{card.imgsrc}}" alt="{{card.name}}"/>
    </span>`,

    controller: function ($scope, $http, $location, searchService){
        $scope.$watch( function(){ return searchService.getSearch() }, function(){
            loadResults();
        });
        $scope.$watch( function(){ return searchService.getPage() }, function(){
            loadResults();
        });

        function loadResults(){
            $http.get(`${apiLink}?locale=en_US&page=${searchService.getPage()}
                ${searchService.getQuery()?"&textFilter="+searchService.getQuery():""}
                ${searchService.getFilters()["rarity"]?"&rarity="+searchService.getFilters()["rarity"]:""}
                ${searchService.getFilters()["type"]?"&type="+searchService.getFilters()["type"]:""}
            `, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then((response) => {
                if(response.status >= 200 && response.status < 300)
                {
                    $scope.cards = [];
                    response.data["cards"].forEach(card => {
                        $scope.cards.push({"name":card["name"], "imgsrc":card["image"], "link":`/card/${card["id"]}`});
                    });
                }
                else
                {
                    console.log("API sad: " + response.statusText);
                }
            });
        }
        loadResults();

        $scope.redirectCard = function(img){
            $location.path(img["card"]["link"]);
        }
    }
})