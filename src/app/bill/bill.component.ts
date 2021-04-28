import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  ingredients = [];
  private subscription: Subscription;
  public price;
  constructor(private router: Router, private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      )
      this.price = this.shoppingListService.rate / 100 ;
      
  }

  back(){
    this.router.navigate(['/shopping-list']);
  }
  buynow(){
    this.router.navigate(['/billing']);
  }
}
