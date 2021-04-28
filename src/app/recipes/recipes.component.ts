import { WithDataService } from './../shared/with-data.service';
import { WalletDataService } from './../wallet-data.service';
import { OrderService } from './../shared/order.service';
import { UserService } from './../shared/user.service';
import { AuthService } from './../auth/auth.service';
import { DataService } from './../shared/data.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  public email; 
  public admin = false;

  constructor(private orderService: OrderService, private wd: WithDataService,private dataService: DataService, private router: Router, private authService: AuthService, private userService: UserService, private walletData: WalletDataService) {
   
   }

  ngOnInit() {
    
    this.dataService.fetchRecipes();
    this.email = this.userService.userEmail;
    this.admin = this.userService.isAdmin();
    this.walletData.fetchWallet();
    this.wd.fetchPayments();
  }

  onNewRecipe(){
    this.router.navigate(['recipes/new']);
  }

  goToOrders(){
    this.router.navigate(['/orders']);
  }

}
