/**
 * Cocktail Item Model
 */
export interface CocktailItemModel {
  id: string;
  name: string;
  isAlcoholic: boolean;
  imageUrl: string;
  instructions: string;
  ingredients: Array<string>;
}
