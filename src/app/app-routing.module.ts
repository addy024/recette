import { PaymentsComponent } from './payments/payments.component';
import { WithdrawPageComponent } from './withdraw-page/withdraw-page.component';
import { TutorialGuard } from './guards/tutorial.guard';
import { UserOrderComponent } from './user-order/user-order.component';
import { OrdersComponent } from './orders/orders.component';
import { BillComponent } from './bill/bill.component';
import { BillingComponent } from './billing/billing.component';
import { AuthComponent } from './auth/auth.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    children : [
      { path: '', component: RecipeListComponent},
      { path: 'new', component: RecipeEditComponent},
      { path: ':id', component: RecipeDetailComponent},
      { path: ':id/edit', component: RecipeEditComponent}
    ]
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [TutorialGuard]
  },
  {
    path: 'billing',
    component: BillingComponent
  },
  {
    path: 'bill',
    component: BillComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'my-order',
    component: UserOrderComponent
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'user',
    component: UserPageComponent
  },
  {
    path:'withdraw',
    component: WithdrawPageComponent
  },
  {
    path:'payments',
    component: PaymentsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
