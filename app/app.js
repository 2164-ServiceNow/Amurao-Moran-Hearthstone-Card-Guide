"use strict";

let app = angular.module("hearthstoneCardGuideApp",["ngRoute", "defaultSearch"]);

app.config(function($locationProvider, $routeProvider)
{
    $routeProvider
    .when("/", {
        // Changed temporarily because live-server keeps crashing the app >:(
        // redirectTo: "/search"
        templateUrl: "app/views/search"
    })
    .when("/search", {
        templateUrl: "app/views/search"
    })
    .when("/card", {
        templateUrl: "app/views/card"
    })
    .when("/404", {
        templateUrl: "app/views/404"
    })
    .otherwise("/404");

    $locationProvider
    .html5Mode({
        enabled:true,
        requireBase:false
    });
})


// TODO: Change to Angular fetch
// Retrieve Access Token
let apiLink = `https://us.api.blizzard.com/hearthstone/`;
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

// // Retrieve Test Card
// const testCard = 678;
// fetch(`${apiLink}/cards/${testCard}?locale=en_US`, {
//     headers: { 
//         "Authorization": "Bearer " + localStorage.getItem("token")
//     }
// }).then(response => {
//     if(response.ok)
//     {
//         response.json().then(content => {
//             console.log(content)
//         })
//     }
//     else
//     {
//         error("Unable to get data from API.");
//     }
// });
// // Retrieve Test Card End