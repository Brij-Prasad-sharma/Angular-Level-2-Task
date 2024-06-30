import { ChangeDetectionStrategy, Component, InputSignal, OutputEmitterRef, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TagsComponent } from '../../../../ui-components/tags/tags.component';
import { CocktailTypeBgColorEnum, CocktailTypeEnum } from '../../constants/cocktail-type.constant';
import { CocktailItemModel } from '../../model/cocktail.model';
import { CocktailIngredientsDisplayPipe } from '../../pipes/cocktail.ingredients.pipe';

@Component({
  selector: 'app-cocktail-item',
  standalone: true,
  imports: [TagsComponent, CocktailIngredientsDisplayPipe, RouterModule],
  templateUrl: './cocktail-item.component.html',
  styleUrl: './cocktail-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailItemComponent {
  /**
   * Receive cocktail item from parent.
   */
  public item: InputSignal<CocktailItemModel> = input.required();

  /**
   * Receives whether the cocktail is favorite or not from parent.
   */
  public isFavorite: InputSignal<boolean> = input.required();

  /**
   * Notify the parent when star icon is clicked.
   */
  public favoriteClicked: OutputEmitterRef<CocktailItemModel> = output<CocktailItemModel>();

  // Enum used for displaying cocktail type in tag.
  public readonly cocktailType = CocktailTypeEnum;

  // Enum used for displaying cocktail type in tag.
  public readonly cocktailTypeBgColor = CocktailTypeBgColorEnum;

  /**
   * Listen to star icon click.
   */
  public onFavoriteClick(): void {
    this.favoriteClicked.emit(this.item());
  }
}
