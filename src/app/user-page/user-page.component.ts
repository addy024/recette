import { WalletDataService } from './../wallet-data.service';
import { UserWalletService } from './../user-wallet.service';
import { Router, Params } from '@angular/router';
import { DataService } from './../shared/data.service';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { UserService } from './../shared/user.service';
import { Subscription } from 'rxjs';


import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  subscription: Subscription;
  recipes = [];
  currentUser = '';
  amount;
  admin = false;

  check = true;

  constructor( private userService: UserService, 
    private router: Router ,
    private recipeService: RecipeService, 
    private dataService: DataService,
    private walletService: UserWalletService,
    private walletData: WalletDataService) { }

  ngOnInit() {
    this.currentUser = this.userService.userEmail;
  
    this.amount = this.walletService.getAmount(this.currentUser)

    console.log('current user : ', this.currentUser);
    this.dataService.fetchRecipes();

    this.admin = this.userService.isAdmin();
    
    this.subscription = this.recipeService.recipeChanged
      .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
      )
    this.recipes = this.recipeService.getRecipes();
    this.walletData.fetchWallet();
    if(this.amount > 20) {
      this.check = false
    }
  }

  onNewRecipe(){
    this.router.navigate(['recipes/new']);
  }

  navigate(){
    this.router.navigate(['withdraw']);
  }

 

}
