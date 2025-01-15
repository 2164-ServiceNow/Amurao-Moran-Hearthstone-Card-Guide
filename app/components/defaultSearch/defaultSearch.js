let module = angular.module("defaultSearch", ["searchbar"]);
module.component("defaultresults", {
    template:
    `<span ng-repeat="card in $ctrl.cards">
        <img src="{{card.imgsrc}}"/>
    </span>`,
    controller: function ($http){
        $http.get(apiLink + `cards?locale=en_US`, {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
        .then((response) => {
            console.log(response);
            if(response.status >= 200 && response.status < 300)
            {
                this.cards = [];
                response.data["cards"].forEach(card => {
                    this.cards.push({"imgsrc":card["image"]}); 
                });
            }
            else
            {
               console.log("API sad: " + response.statusText);
            }
        })
    }
})