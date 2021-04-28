import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
 
  subscription: Subscription;
  selectedCategory = 'Veg';
  selectedRegion = 'foreign';
  show = false;

  recipes: Recipe[];

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged
      .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
      )
    this.recipes = this.recipeService.getRecipes();
  }

  
  
  onChange(newValue){
    this.selectedCategory = newValue;
  }

  onChangeRegion(newValue){
    this.selectedRegion = newValue;
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toogle(){
    this.show = !this.show;
  }

}
