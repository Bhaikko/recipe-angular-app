import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from './../shopping-list/store/shopping-list.actions';
import * as fromApp from './../store/app.reducer';


@Injectable()
export class RecipeService {
  
  recipesChanged = new Subject<Recipe[]>();

  // Recipes are now loaded from database
  // private recipes: Recipe[] = [
  //     new Recipe(
  //       'Tasty Schnitzel',
  //       'A super-tasty Schnitzel - just awesome!',
  //       'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //       [
  //         new Ingredient('Meat', 1),
  //         new Ingredient('French Fries', 20)
  //       ]),
  //     new Recipe('Big Fat Burger',
  //       'What else you need to say?',
  //       'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //       [
  //         new Ingredient('Buns', 2),
  //         new Ingredient('Meat', 1)
  //       ])
  // ];

  // this code is no longer required since selecting is recipe is handled by routing and query params
  // recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [];
  constructor (
    private slService: ShoppingListService, 
    private store: Store<fromApp.AppState>
  ) {

  }
  
  getRecipes() {
      return this.recipes.slice();    // returns the copy of current array
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe (recipe: Recipe) {
    console.log(recipe);
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  
  updateRecipe (index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes (recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes);
  }

}