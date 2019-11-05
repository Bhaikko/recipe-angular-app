import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    // subscribe is used to listen for event being emitted from anywhere in the app
    // this.recipeService.recipeSelected.subscribe((recipe: Recipe) => this.selectedRecipe = recipe);
  }

  

}
