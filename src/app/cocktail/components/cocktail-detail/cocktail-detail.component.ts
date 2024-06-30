import { ChangeDetectionStrategy, Component, DestroyRef, InputSignal, OnInit, WritableSignal, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { TagsComponent } from '../../../../ui-components/tags/tags.component';
import { CocktailTypeBgColorEnum, CocktailTypeEnum } from '../../constants/cocktail-type.constant';
import { CocktailItemModel } from '../../model/cocktail.model';
import { CocktailService } from '../../services/cocktail.service';

@Component({
  selector: 'app-cocktail-detail',
  standalone: true,
  imports: [TagsComponent, RouterModule],
  templateUrl: './cocktail-detail.component.html',
  styleUrl: './cocktail-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailDetailComponent implements OnInit {
  // Receive params cocktail id as using input syntax.
  public cocktailId: InputSignal<string> = input.required();

  // Favorite cocktails list as map.
  public favoriteCocktailListAsMap: Map<string, CocktailItemModel> = new Map();

  // Cocktail details.
  public cocktailDetail: WritableSignal<CocktailItemModel | null> = signal(null);

  // Enum to add class for the cocktail type.
  public readonly cocktailType = CocktailTypeEnum;

  // Enum to add class for the cocktail type.
  public readonly cocktailTypeBgColor = CocktailTypeBgColorEnum;

  /**
   * Services used in the component.
   */
  private readonly cocktailService: CocktailService = inject(CocktailService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  /**
   * Add Initialize logic.
   */
  public ngOnInit(): void {
    this.fetchDetail();
    this.listenFavoriteChange();
  }

  /**
   * Fetch the cocktail details acording to the given id.
   */
  public async fetchDetail(): Promise<void> {
    const cocktailDetail: CocktailItemModel = await this.cocktailService.getCocktailById(this.cocktailId());
    this.cocktailDetail.set(cocktailDetail);
  }

  /**
   * Listen to star icons click.
   */
  public onFavoriteClick(): void {
    this.cocktailService.toggleFavorite(this.cocktailDetail() as CocktailItemModel);
  }

  /**
   * Listen to favorite cocktails list change and get the updated list as map.
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
