import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {
    // ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>();


    ingredients: Ingredient[] = [
        new Ingredient("Potato", 5),
        new Ingredient("Tomato", 6),
        new Ingredient("Apples", 4)
    ];

    getIngredients() {
        return [...this.ingredients];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice()); // Emitting the event is neccesary to update the state of the components listening/subscribed to this event
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}