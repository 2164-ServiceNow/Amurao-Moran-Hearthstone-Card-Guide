module = angular.module("hearthstoneCardGuideApp")
module.service("searchService", function(){
    // Toggle Search
    this.search = false;
    this.toggleSearch = function()
    {
        this.search = !this.search;
    }
    this.getSearch = function()
    {
        return this.search;
    }
    
    // Search Bar
    this.query = "";
    this.setQuery = function(query){
        this.query = query;
    }
    this.getQuery = function(){
        return this.query;
    }

    // Page Handler
    this.page = 1;
    this.prevPage = function(){
        this.page--;
        if(this.page<1)
        {
            this.page = 1;
        }
    }
    this.nextPage = function(){
        this.page++;
    }
    this.setPage = function(value){
        this.page = value;
        if(this.page<1)
        {
            this.page = 1;
        }
    }
    this.getPage = function(){
        return this.page;
    }
    

    // Filters
    this.filters = {"collectibles":true};
    this.getFilters = function()
    {
        return this.filters;
    }
    this.setCollectibles = function(value)
    {
        this.filters["collectibles"] = value;
    }
    this.setRarity = function(value)
    {
        this.filters["rarity"] = value;
    }
    this.setType = function(value)
    {
        this.filters["type"] = value;
    }
})