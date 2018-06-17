import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe-list/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) { }

  storeRecipes() {
    const token: string = this.authService.getToken();
    return this.http.put('https://ng-livro-receita.firebaseio.com/recipes.json?auth=' + token
    , this.recipeService.getAllRecipes());
  }

  getRecipes() {
    const token: string = this.authService.getToken();
    this.http.get<Recipe[]>('https://ng-livro-receita.firebaseio.com/recipes.json?auth=' + token).subscribe(
      (response) => {
          const recipes: Recipe[] = response;
          this.recipeService.SetRecipes(recipes);
      }
    );
  }
}
