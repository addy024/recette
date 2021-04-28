import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subscription: Subscription;
  public no;
  public price;
  public checkItem = false;

  constructor(private shopListService: ShoppingListService, private router: Router) { }

  ngOnInit() {
    this.ingredients = this.shopListService.getIngredients();
    this.subscription = this.shopListService.ingredientChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      )
      this.shopListService.price();
      this.no = this.shopListService.numberOfItem;
      this.price = this.shopListService.rate;
      if(this.ingredients.length > 0){
        this.checkItem = true;
      }
  }

  onEditItem(index: number){
    this.shopListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  bill(){
    this.router.navigate(['/bill']);
  }
}
