import { Subject } from 'rxjs/Subject';
import { Ingredient } from '../shared/ingredients.module';

export class ShoppingListService {
    constructor() { }

    IngredientsHaveChange = new Subject<Ingredient[]>();
    ingredientAdded = new Subject<Ingredient>();
    ingredientRemoved = new Subject<Ingredient>();
    editingIngredient = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Maça', 5),
        new Ingredient('Uva', 2),
        new Ingredient('Laranja', 2),
        new Ingredient('Pessego', 1),
    ];

    SetNewListIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.IngredientsHaveChange.next(this.ingredients.slice());
    }

    GetAllIngridients() {
        return this.ingredients.slice();
    }

    GetIngredientByIndex(index: number) {
      return this.ingredients[index];
    }

    Add(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.IngredientsHaveChange.next(this.ingredients.slice());
    }

    RemoveByName(ingredient: Ingredient) {
        if (ingredient != null) {
            this.Removeitem(ingredient);
        }
        this.IngredientsHaveChange.next(this.ingredients.slice());
    }

    Removeitem(ingredient: Ingredient) {
        this.ingredients.forEach((item, index) => {
            if (this.ingredients[index].name === ingredient.name) {
                this.ingredients.splice(index, 1);
                this.Removeitem(ingredient);
            }
        });
    }

    RemoveByIndex(index: number) {
      this.ingredients.splice(index, 1);
      this.IngredientsHaveChange.next(this.ingredients.slice());
    }

    UpdateIngredient(index: number, newIngred: Ingredient) {
      this.ingredients[index] = newIngred;
      this.IngredientsHaveChange.next(this.ingredients.slice());
    }
}
