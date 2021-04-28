import { WithdrawnService } from './shared/withdrawn.service';
import { WithDataService } from './shared/with-data.service';
import { PaymentsComponent } from './payments/payments.component';
import { WalletDataService } from './wallet-data.service';
import { UserWalletService } from './user-wallet.service';
import { WithdrawPageComponent } from './withdraw-page/withdraw-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { OrdersComponent } from './orders/orders.component';
import { BillComponent } from './bill/bill.component';
import { BillingComponent } from './billing/billing.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthComponent } from './auth/auth.component';
import { DataService } from './shared/data.service';
import { RecipeService } from './recipes/recipe.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SafePipeModule } from 'safe-pipe';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { OrderService } from './shared/order.service';
import { SafePipe } from './safe.pipe';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent, PaymentsComponent,WithdrawPageComponent,
    BillComponent,UserPageComponent, SafePipe, UserOrderComponent ,
    OrdersComponent ,BillingComponent , RecipesComponent, ShoppingListComponent,
     RecipeDetailComponent, RecipeListComponent, RecipeItemComponent, ShoppingEditComponent, 
     RecipeEditComponent, AuthComponent, LoadingSpinnerComponent, SafePipe],
  entryComponents: [],
  imports: [
    SafePipeModule ,
    BrowserModule, 
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    WithDataService,
    UserWalletService,
    WalletDataService,
    OrderService,
    ShoppingListService,
    RecipeService,
    DataService ,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
