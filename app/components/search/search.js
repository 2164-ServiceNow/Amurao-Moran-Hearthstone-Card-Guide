let module = angular.module("search", ["searchbar"]);
module.component("results", {
    template:
    `<span ng-repeat="card in cards">
        <img ng-click="redirectCard('/card')" src="{{card.imgsrc}}"/>
    </span>`,

    controller: function ($scope, $http, searchBarService, $location){        
        $scope.$watch( function(){ return searchBarService.getQuery() }, function(searchInput){
            loadResults();
        });

        function loadResults()
        {
            $http.get(`${apiLink}&textFilter=${searchBarService.getQuery()}`, {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
            .then((response) => {
                if(response.status >= 200 && response.status < 300)
                {
                    console.log(response.data);
                    $scope.cards = [];
                    response.data["cards"].forEach(card => {
                        $scope.cards.push({"imgsrc":card["image"], "link" : "/card"});
                    });
                }
                else
                {
                    console.log("API sad: " + response.statusText);
                }
            });
        }
        loadResults();

        $scope.redirectCard = function(link){
            console.log("hi")
            $location.path(link)
            

            
        }
    }
})