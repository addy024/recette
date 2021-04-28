import { WithDataService } from './shared/with-data.service';
import { WalletDataService } from './wallet-data.service';
import { UserService } from './shared/user.service';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { RecipeService } from './recipes/recipe.service';
import { Recipe } from './recipes/recipe.model';
import { DataService } from './shared/data.service';
import { Component, OnInit, OnDestroy, OnChanges, DoCheck } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  private userSub: Subscription;
  isAuth = false;
  public userE;
  public admin = false;


  public appPages = [
    {
      title: 'Recipes',
      url: '/recipes',
      icon: 'home'
    },
    {
      title: 'Shopping-list',
      url: '/shopping-list',
      icon: 'list'
    },
    {
      title: 'Orders',
      url: '/my-order',
      icon: ''
    },
    {
      title: 'User',
      url: '/user'
    },
    {
      title: 'Auth',
      url: '/auth',
      icon: ''
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService,
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private walletData: WalletDataService,
    private wD: WithDataService
  ) {
    this.initializeApp();
  }

  ngOnInit(){
    this.wD.fetchPayments();
    this.walletData.fetchWallet();
    this.dataService.fetchRecipes();
    this.userSub = this.authService.user.subscribe(user => {
    this.isAuth = !!user;
    });
    if (!this.isAuth) {
      this.router.navigate(['auth']);
    }
    this.userE = this.userService.userEmail;
    this.admin = this.userService.isAdmin();
    console.log("User Name : ", this.userE);
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    
  }

  clickMe() {
    this.isAuth = false;
    this.userService.admin = false;
  }
}
