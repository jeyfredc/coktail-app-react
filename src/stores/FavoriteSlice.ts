import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { NotificacionSliceType, createNotificationSlice } from "./notificationSlice"


export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExist:(id: Recipe['idDrink'])=> boolean
    loadFromStorage: ()=> void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType &NotificacionSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe: Recipe) => {
        if (get().favoriteExist(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set, get,api).showNotification({
                text: 'Se eliminó  de favoritos',
                error: true,
            })
        } else {
            
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))
            createNotificationSlice(set, get,api).showNotification({
                text: 'Se agrego  a favoritos',
                error: false,
            })
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
        
    },
    favoriteExist: (id)=>{
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})