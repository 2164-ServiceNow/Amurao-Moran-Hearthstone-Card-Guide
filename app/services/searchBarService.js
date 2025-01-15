let module = angular.module("hearthstoneCardGuideApp")
module.service("searchBarService", function(){
    this.query = ""

    this.setQuery = function(query){
        this.query = query
    }

    this.getQuery = function(){
        return this.query
    }
})