import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';  // convention to add from when importing from reducer

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private igChangeSub: Subscription;

  // while injecting store, the value and types must be same as in app.module
  constructor(
    private shoppingListService: ShoppingListService, 
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    // async pipe is used in template to access the values from subscription
    this.ingredients = this.store.select('shoppingList');

    // handled through ngRx
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  ngOnDestroy () {
    // this.igChangeSub.unsubscribe();
  }

  onEditItem (index: number) {
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
