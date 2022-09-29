import { EventEmitter, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService implements OnInit, OnDestroy {
  removeIng(i: number) {
    this.ingredientsArray.splice(i, 1);
    this.eventAddToShoppingList.next(this.ingredientsArray.slice());

  }
  ingredientsArray: Ingredient[] = [new Ingredient("Apple", 4), new Ingredient("Tomatos", 2)];

  // eventAddToShoppingList: EventEmitter<Ingredient[]> = new EventEmitter();
  eventAddToShoppingList: Subject<Ingredient[]> = new Subject();
  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.eventAddToShoppingList.unsubscribe();
    console.log("Shopping List component destroyed!");
  }


  getShoppingList(): Ingredient[] {
    return this.ingredientsArray.slice();
  }

  toShoppingList(ingred: Ingredient[]) {
    this.ingredientsArray.push(...ingred);
    // this.eventAddToShoppingList.emit(this.ingredientsArray.slice());
    this.eventAddToShoppingList.next(this.ingredientsArray.slice());

  }
  addIngredient(singleIngredient: Ingredient): void {
    this.ingredientsArray.push(singleIngredient);
    // this.eventAddToShoppingList.emit(this.ingredientsArray.slice());
    this.eventAddToShoppingList.next(this.ingredientsArray.slice());

  }


}
