import { UserService } from './user.service';
import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take, exhaustMap, tap } from 'rxjs/operators';


@Injectable()
export class DataService {

    constructor(private http: HttpClient, 
        private recipeService: RecipeService, 
        private authService: AuthService,
        private userService: UserService){}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
        .put('https://recette-df779.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log('a');
        });
    }


    fetchRecipes(){
        this.authService.user.subscribe(user => {
            console.log(user.id);
            console.log(user.email);
            this.userService.userEmail = user.email;
            this.userService.userId = user.id;
            this.userService.userToken = user.token;
            this.http
            .get<Recipe[]>('https://recette-df779.firebaseio.com/recipes.json', {
                params: new HttpParams().set('auth', user.token)
            } )
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [], steps: recipe.steps ? recipe.steps : []}
                });
            }))
            .subscribe(recipes => {
                this.recipeService.setRecipes(recipes);
            });
        })
    }


}