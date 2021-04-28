import { UserWalletService } from './../../user-wallet.service';
import { AlertController } from '@ionic/angular';
import { UserService } from './../../shared/user.service';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;
  email: string;
  admin = false;
  

  constructor(private router: Router,
    private alertController: AlertController ,
    private rS: RecipeService, 
    private route: ActivatedRoute,
    private userService: UserService,
    private userWalletService: UserWalletService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.rS.getRecipe(this.id);
        }
      );
    this.email = this.userService.userEmail;
    this.admin= this.userService.isAdmin();
  }

  onBack(){
    this.router.navigate(['/recipes'])
    
  }

  url(){
    return this.recipe.image
  }
  async onAddToShoppingList(){
  this.rS.addIngredientsToShoppingList(this.recipe.ingredients);
  this.userWalletService.addedToWallet(this.recipe.ingredients.length, this.recipe.userName);
  const alert = await this.alertController.create({
      header: 'Added',
      message: "Recipe's Ingredients is added to shopping list successfully.",
      buttons: ['OK']
    });
    await alert.present();
    
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.rS.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}

