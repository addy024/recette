import { DataService } from './../shared/data.service';
import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable, Injector } from '@angular/core';
import { Recipe } from './recipe.model';



@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();
    
    constructor(private slService: ShoppingListService, private injector: Injector){}

   
    private recipes: Recipe[] = [];

      setRecipes(recipes: Recipe[]) {
          this.recipes = recipes;
          this.recipeChanged.next(this.recipes.slice());
          const ds = this.injector.get(DataService);
          ds.storeRecipes();
        
      }

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
            return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
            this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
        const ds = this.injector.get(DataService);
          ds.storeRecipes();
         

      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
        const ds = this.injector.get(DataService);
        ds.storeRecipes();
       

    }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1);
          this.recipeChanged.next(this.recipes.slice());
          const ds = this.injector.get(DataService);
          ds.storeRecipes();
         

        }
}