import { create } from 'zustand';
import { RecipesSliceType, createRecipesSlice } from './recipeSlice';
import { devtools } from 'zustand/middleware';
import { FavoritesSliceType, createFavoritesSlice } from './FavoriteSlice';
import { NotificacionSliceType, createNotificationSlice } from './notificationSlice';


export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificacionSliceType>()(devtools((...a)=> ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a)
})))