import { Recipe } from './recipe-list/recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';
import { DataStorageService } from '../shared/data-storage-service';

@Injectable()
export class RecipeService {
  constructor(private shpService: ShoppingListService) {}
  recipesChange = new Subject<Recipe[]>();
  private recipes: Recipe[];

  getAllRecipes() {
    return this.recipes != null ? this.recipes.slice() : [];
  }

  getRecipesById(index: number) {
    return this.recipes[index];
  }
  AddNewIngredientsShopList(ingr: Ingredient[]) {
    this.shpService.SetNewListIngredients(ingr);
  }

  AddRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.UpdateRecipeList();
  }

  UpdateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.UpdateRecipeList();
  }

  RemoveRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.UpdateRecipeList();
  }

  RemoveIngredientOfRecipe(indexRecipe: number, indexIngredient: number) {
    this.recipes[indexRecipe].ingredients.splice(indexIngredient, 1);
    this.UpdateRecipeList();
  }

  SetRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.UpdateRecipeList();
  }

  private UpdateRecipeList() {
    this.recipesChange.next(this.getAllRecipes());
  }
}
