import { Params } from '@angular/router';
import { Ingredient } from './../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

  ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    numberOfItem;
    rate;

    private ingredients: Ingredient[] = [];

      getIngredients() {
          return this.ingredients.slice();
      }

      getIngredient(index: number){
          return this.ingredients[index];
      }

      
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  clearIngredient(){
    this.ingredients = [];
    this.ingredientChanged.next(this.ingredients.slice());
  }
  price() {
    this.numberOfItem = this.ingredients.length;
    this.rate = this.numberOfItem * 100 * 0.64 + 100
  }
}