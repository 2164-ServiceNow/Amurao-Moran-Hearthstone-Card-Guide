let app = angular.module("hearthstoneCardGuideApp",["ngRoute"]);
let apiLink = `https://us.api.blizzard.com/`;

// Retrieve Access Token
let params = new URLSearchParams();
params.append("client_id", `12e8413f3f344256a984d99529f986cb`);
params.append("client_secret", `E16Mu4edINRoaKjVEk5VrX0ntkOiCQ1d`);
params.append("grant_type", "client_credentials");
fetch(`https://oauth.battle.net/token`, {
    method: "POST",
    body: params
}).then(response => {
    if(response.ok)
    {
        response.json().then(content => {
            localStorage.setItem("token", content["access_token"])
            console.log(localStorage.getItem("token"));
        })
    }
    else
    {
        error("Response not ok")
    }
});
// Retrieve Access Token End


app.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when("/", {
        templateUrl: "app/pages/main.html"
    })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    })
})