import { CocktailItemModel } from '../model/cocktail.model';

/**
 * Add or update the favorite cocktail list in localstorage.
 *
 * @param key - Key to identify favorite cocktails list.
 * @param value - Favorite cocktails list as map.
 */
export const addUpdateFavoriteCocktailsToLocalStorage = (key: string, value: Map<string, CocktailItemModel>): void => {
  // We need to get favorite as array in stringify format, else it won't be saved to localstorage.
  localStorage.setItem(key, JSON.stringify(Array.from(value.entries())));
};

/**
 * Provides the favorite cocktails list from localstorage.
 *
 * @param key - Key to identify favorite cocktails list.
 * @returns - Returns the favorite cocktails list as map.
 */
export const getFavoriteCocktailsMapFromLocalStorage = (key: string): Map<string, CocktailItemModel> => {
  const favoriteList: string | null = localStorage.getItem(key);

  // If does not exits then return empty map.
  if (!favoriteList) {
    return new Map<string, CocktailItemModel>();
  }

  // Parse the list and convert it into the map.
  return new Map<string, CocktailItemModel>(JSON.parse(favoriteList));
};
