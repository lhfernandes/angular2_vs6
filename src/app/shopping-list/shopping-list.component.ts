import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredients.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  @ViewChild('appShoppingEdit') private appShoppingChild: ShoppingEditComponent;

  ingredients: Ingredient[] = [];

  selectedIngredient = null;
  private subIngredient: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.GetAllIngridients();
    this.subIngredient = this.shoppingListService.IngredientsHaveChange.subscribe(
      (ingredients) => { this.ingredients = ingredients; }
    );
  }

  ngOnDestroy() {
    this.subIngredient.unsubscribe();
  }
  onItemSelected(index: number) {
     this.shoppingListService.editingIngredient.next(index);
  }

}
