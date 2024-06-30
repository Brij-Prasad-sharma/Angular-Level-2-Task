import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { FAVORITE_COCKTAILS_STORAGE_KEY } from '../constants/cocktail-type.constant';
import { addUpdateFavoriteCocktailsToLocalStorage, getFavoriteCocktailsMapFromLocalStorage } from '../helpers/localstorage.helper';
import { CocktailItemModel } from '../model/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  // Store the favorite cocktails as map in memory.
  private favoriteCocktailMap: Map<string, CocktailItemModel> = new Map<string, CocktailItemModel>();

  // Behaviour subject to notify all subs.
  private readonly favoriteCocktailMapSubject: BehaviorSubject<Map<string, CocktailItemModel>> = new BehaviorSubject(new Map());

  // Constant for API points
  private readonly API_PATH_COCKTAILS: string = '/cocktails';

  constructor(private readonly http: HttpClient) {
    // Initially fetch favorite.
    this.fetchFavorite();
  }

  /**
   * Fetch all the cocktails from api.
   *
   * @returns - Return Promise with array of cocktails.
   */
  public async getCocktails(): Promise<Array<CocktailItemModel>> {
    return firstValueFrom(this.http.get<Array<CocktailItemModel>>(this.API_PATH_COCKTAILS));
  }

  /**
   * Get cocktail by id.
   *
   * @param id - Cocktail id.
   * @returns - Return Promise with specific cocktail.
   */
  public getCocktailById(id: string): Promise<CocktailItemModel> {
    return firstValueFrom(this.http.get<CocktailItemModel>(`${this.API_PATH_COCKTAILS}/${id}`));
  }

  /**
   * Toggles the cocktail from favorite list.
   *
   * @param item - Cocktail item to toggle in favorite list.
   */
  public toggleFavorite(item: CocktailItemModel): void {
    // Toggle based on existence.
    this.favoriteCocktailMap.has(item.id) ? this.favoriteCocktailMap.delete(item.id) : this.favoriteCocktailMap.set(item.id, item);

    // Update favorite in localstorage
    addUpdateFavoriteCocktailsToLocalStorage(FAVORITE_COCKTAILS_STORAGE_KEY, this.favoriteCocktailMap);

    // Notify users
    this.notifySubsWithUpdatedFavoriteMap(this.favoriteCocktailMap);
  }

  /**
   * Provides favorite cocktails list in map as observable.
   *
   * @returns - Returns the favorite cocktail map asn an observable.
   */
  public getFavoriteCocktailMapAsObservable(): Observable<Map<string, CocktailItemModel>> {
    return this.favoriteCocktailMapSubject.asObservable();
  }

  /**
   * Fetch the favorite cocktails from the localstorage.
   */
  private fetchFavorite(): void {
    // Fetch from localstorage.
    this.favoriteCocktailMap = getFavoriteCocktailsMapFromLocalStorage(FAVORITE_COCKTAILS_STORAGE_KEY);

    // Notify users
    this.notifySubsWithUpdatedFavoriteMap(this.favoriteCocktailMap);
  }

  /**
   * Notify the subs about updated favorite cocktails map.
   *
   * @param list - Updated Favorite cocktails as a map.
   */
  private notifySubsWithUpdatedFavoriteMap(list: Map<string, CocktailItemModel>): void {
    this.favoriteCocktailMapSubject.next(list);
  }
}
