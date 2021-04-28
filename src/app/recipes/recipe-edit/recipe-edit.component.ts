import { UserService } from './../../shared/user.service';
import { Recipe } from './../recipe.model';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Steps } from './../../shared/steps.model';
import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, RouterModule, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  uEmail;

  constructor(private route: ActivatedRoute, private rS: RecipeService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      )
      this.uEmail = this.userService.userEmail;
  }

  private initForm() {
    let recipeName = '';
    let recipeImage = '';
    let recipeVideo = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    let recipeSteps = new FormArray([]);
    let recipeOwner = this.uEmail;
    let recipeRegion = '';
    let recipeCatrgory = '';


    if(this.editMode) {
      const recipe = this.rS.getRecipe(this.id); 
      recipeName = recipe.name;
      recipeImage = recipe.image;
      recipeVideo = recipe.video;
      recipeDescription = recipe.description;
      recipeOwner = recipe.userName;
      recipeCatrgory = recipe.category;
      recipeRegion = recipe.region;
      if (recipe['ingredients']) {
        for ( let ing of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ing.name, Validators.required),
              'amount': new FormControl(ing.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
              'unit': new FormControl(ing.unit, Validators.required)
            })
          );
        }
      }

      if (recipe['steps']) {
        for ( let step of recipe.steps) {
          recipeSteps.push(
            new FormGroup({
              'stepNo' : new FormControl(step.stepNo, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
              'stepDesc' : new FormControl(step.stepDesc, Validators.required)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'image': new FormControl(recipeImage, Validators.required),
      'video': new FormControl(recipeVideo, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
      'steps': recipeSteps,
      'userName': new FormControl(recipeOwner),
      'category': new FormControl(recipeCatrgory, Validators.required),
      'region': new FormControl(recipeRegion, Validators.required)
    });

    
  }

  onSubmit(){
    

    if (this.editMode) {
      this.rS.updateRecipe(this.id, this.recipeForm.value)
    }
    else {
      this.rS.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['/recipes'])
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        'unit': new FormControl(null, Validators.required)
      })
    );
  }

  onAddStep() {
    (<FormArray>this.recipeForm.get('steps')).push(
      new FormGroup({
        'stepNo': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        'stepDesc': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    onDeleteStep(index: number) {
      (<FormArray>this.recipeForm.get('steps')).removeAt(index);
    }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  get control() {
    return (<FormArray>this.recipeForm.get('steps')).controls;
  }
}
