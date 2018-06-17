import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredients.module';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  selectedIngredient: Ingredient;
  idselectedIngredient: number;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.editingIngredient.subscribe(
      (index: number) => {
        this.editMode = true;
        this.idselectedIngredient = index;
        this.selectedIngredient = this.shoppingListService.GetIngredientByIndex(index);
        this.slForm.setValue({
          name: this.selectedIngredient.name,
          amount: this.selectedIngredient.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  AddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.UpdateIngredient(this.idselectedIngredient
        , newIngredient);
    } else {
      this.shoppingListService.Add(newIngredient);
    }
    this.ClearInput();
  }

  RemoveItem() {
    if (this.editMode) {
      this.shoppingListService.RemoveByIndex(this.idselectedIngredient);
      this.ClearInput();
    }
  }

  ClearInput() {
    this.slForm.resetForm();
    this.editMode = false;
  }

}
