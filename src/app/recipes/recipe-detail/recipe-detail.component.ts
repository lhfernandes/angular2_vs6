import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe-list/recipe.model';
import { AppComponent } from '../../app.component';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe = null;
  id: number;

  constructor(private recipeService: RecipeService,
    private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params
    .subscribe((params: Params) => {
     this.id = +params['id'];
     this.recipe = this.recipeService.getRecipesById(this.id);
    });
  }


  GoShopping() {
    this.recipeService.AddNewIngredientsShopList(this.recipe.ingredients);
    this.router.navigate(['/compras']);
  }

  onRecipeEdit() {
    this.router.navigate(['edit'], {relativeTo: this.activeRoute});
  }

  onRecipeRemove() {
    this.recipeService.RemoveRecipe(this.id);
    this.router.navigate(['/receita']);
  }

}
