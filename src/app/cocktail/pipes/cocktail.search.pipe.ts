import { Pipe, PipeTransform } from '@angular/core';
import { CocktailItemModel } from '../model/cocktail.model';

@Pipe({
  name: 'cocktailSearch',
  standalone: true
})
export class CocktailSearchPipe implements PipeTransform {
  /**
   * Filter the cocktails list based on user search.
   *
   * @param value - Cocktails list.
   * @param keyword - Cocktail name searched by user.
   *
   * @returns - Returns the filter list of cocktails according to search.
   */
  transform(value: Array<CocktailItemModel>, keyword: string): Array<CocktailItemModel> {
    if (!keyword) {
      return value;
    }

    return value.filter((cocktail) => cocktail.name.toLowerCase().includes(keyword.toLowerCase()));
  }
}
