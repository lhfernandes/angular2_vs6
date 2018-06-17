import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipesChageSubscription: Subscription;
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipesChageSubscription = this.recipeService.recipesChange.subscribe(
      (newrecipes: Recipe[]) => {
      this.recipes = newrecipes;
    });
    this.recipes = this.recipeService.getAllRecipes();
  }

  ngOnDestroy() {
    this.recipesChageSubscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
