let module = angular.module("search", ["searchbar"]);
module.component("results", {
    template:
    `<span ng-repeat="card in cards">
        <img src="{{card.imgsrc}}"/>
    </span>`,

    controller: function ($scope, $http, searchBarService){        
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
                        $scope.cards.push({"imgsrc":card["image"]});
                    });
                }
                else
                {
                    console.log("API sad: " + response.statusText);
                }
            });
        }
        loadResults();
    }
})