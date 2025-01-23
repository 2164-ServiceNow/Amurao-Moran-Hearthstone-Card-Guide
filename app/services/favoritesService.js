module = angular.module("hearthstoneCardGuideApp")
module.service("favoritesService", function(){
    this.favorites = localStorage.getItem("favorites") ? localStorage.getItem("favorites").split(",") : [];

    this.save = function()
    {
        localStorage.setItem("favorites", this.favorites.toString());
    }

    this.getFavorites = function()
    {
        return this.favorites;
    }

    this.isFavorite = function(cardId)
    {
        let isFavorite = false;
        this.favorites.forEach(favoriteCardId => {
            if(favoriteCardId == cardId)
            {
                isFavorite = true;
            }
        })
        return isFavorite;
    }

    this.addFavorite = function(cardId)
    {
        let found = false;
        this.favorites.forEach(favoriteCardId => {
            if(favoriteCardId == cardId)
            {
                found = true;   
            }
        })
        if(!found)
        {
            this.favorites.push(cardId);
        }
        this.save();
    }
    
    this.removeFavorite = function(cardId)
    {
        let index = this.favorites.indexOf(cardId);
        if (index > -1)
        {
            this.favorites.splice(index, 1);
        }
        this.save();
    }
})