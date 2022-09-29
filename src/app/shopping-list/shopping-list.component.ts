import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient/ingredient.model';
import { ShoppingListService } from './services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getShoppingList();

    this.shoppingListService.eventAddToShoppingList.subscribe(
      (newShoppingList: Ingredient[]) => {
        this.ingredients = newShoppingList;
        // console.log(this.ingredients);
      }
    );
  }

  omitIngredident(i: number) {
    this.shoppingListService.removeIng(i);
  }

}
