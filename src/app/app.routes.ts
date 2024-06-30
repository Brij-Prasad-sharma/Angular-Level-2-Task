import { Routes } from '@angular/router';
import { CocktailDetailComponent } from './cocktail/components/cocktail-detail/cocktail-detail.component';
import { CocktailComponent } from './cocktail/components/cocktail/cocktail.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cocktails'
  },
  {
    path: 'cocktails',
    component: CocktailComponent
  },
  {
    path: 'cocktails/:cocktailId',
    component: CocktailDetailComponent
  }
];
