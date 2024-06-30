import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { SearchBarComponent } from '../../../../ui-components/search-bar/search-bar.component';
import { CocktailItemModel } from '../../model/cocktail.model';
import { CocktailSearchPipe } from '../../pipes/cocktail.search.pipe';
import { CocktailService } from '../../services/cocktail.service';
import { CocktailItemComponent } from '../cocktail-item/cocktail-item.component';

@Component({
  selector: 'app-cocktail',
  standalone: true,
  imports: [SearchBarComponent, CocktailItemComponent, CocktailSearchPipe],
  templateUrl: './cocktail.component.html',
  styleUrl: './cocktail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailComponent implements OnInit {
  public cocktailItems: Array<CocktailItemModel> = [];
  public favoriteCocktailListAsMap: Map<string, CocktailItemModel> = new Map();

  // Store user search Text for applying in pipe.
  public searchedText: string = '';

  /**
   * Services used in component.
   */
  private readonly cocktailService: CocktailService = inject(CocktailService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  /**
   * Add initialize logic.
   */
  public ngOnInit(): void {
    this.getCocktails();
    this.listenFavoriteChange();
  }

  /**
   * Listen to user search event and assign for further use.
   *
   * @param value - User's search value.
   */
  public listenSearch(value: string): void {
    this.searchedText = value;
  }

  /**
   * Listen to star icon click for favorite toggle.
   *
   * @param item - Clicked icon.
   */
  public onFavoriteClicked(item: CocktailItemModel): void {
    this.cocktailService.toggleFavorite(item);
  }

  /**
   * Fetch the cocktails list.
   */
  private async getCocktails(): Promise<void> {
    this.cocktailItems = await this.cocktailService.getCocktails();
  }

  /**
   * Listen to favorite cocktails list change and receive updated list as map.
   */
  private listenFavoriteChange(): void {
    this.cocktailService
      .getFavoriteCocktailMapAsObservable()
      .pipe(
        tap((map) => (this.favoriteCocktailListAsMap = map)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
