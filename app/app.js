"use strict";
// Retrieve Access Token
let apiLink = `https://us.api.blizzard.com/hearthstone/cards`;
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
            sessionStorage.setItem("token", content["access_token"])
            console.log(sessionStorage.getItem("token"));
        })
    }
    else
    {
        error("Response not ok")
    }
});
// Retrieve Access Token End

// Retrieve Slugs
let slugs = {"rarities":[], "types":[], "minionTypes":[], "spellSchools":[]};

Object.keys(slugs).forEach(key => {
    fetch(`https://us.api.blizzard.com/hearthstone/metadata/${key}?locale=en_US`, {
        headers: { 
            "Authorization": "Bearer " + sessionStorage.getItem("token")
        }
    }).then(response => {
        if(response.ok)
        {
            response.json().then(content => {
                slugs[key] = content;
            })
        }
        else
        {
            error("Unable to get data from API.");
        }
    });
});

localStorage.setItem("slugs", slugs);
// Retrieve Slugs End

// Initialize App
let app = angular.module("hearthstoneCardGuideApp",["ngRoute", "search", "favorites", "card", "searchfilters", "pageNav"]);

app.config(function($locationProvider, $routeProvider)
{
    $routeProvider
    .when("/", {
        redirectTo: "/search"
    })
    .when("/card", {
        redirectTo: "/search"
    })
    .when("/index.html", {
        redirectTo: "/search"
    })
    .when("/search", {
        templateUrl: "/app/views/search"
    })
    .when("/card/:cardId", {
        templateUrl: "/app/views/card"
    })
    .when("/404", {
        templateUrl: "/app/views/404"
    })
    .otherwise("/404");

    $locationProvider
    .html5Mode({
        enabled:true,
        requireBase:false
    });
})
// Initialize App End