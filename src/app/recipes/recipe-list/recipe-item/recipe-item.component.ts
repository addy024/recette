
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';



@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() index: number;
  ingredientAmount;
  StepsCount;
  
  constructor() { }

  ngOnInit() {
    this.ingredientAmount = this.recipe.ingredients.length;
    this.StepsCount = this.recipe.steps.length;
  }


  
}
