import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cocktailIngredientsDisplay',
  standalone: true
})
export class CocktailIngredientsDisplayPipe implements PipeTransform {
  /**
   * Transfor the value by joining with a seperator.
   *
   * @param value - Value to transform
   *
   * @returns - The transformed value.
   */
  transform(value: Array<string>): string {
    return value?.join(' | ');
  }
}
