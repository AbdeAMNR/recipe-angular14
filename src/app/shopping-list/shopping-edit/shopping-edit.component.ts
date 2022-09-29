import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  private _nameFeild: string = '';
  public get nameFeild(): string { return this._nameFeild; }
  public set nameFeild(value: string) { this._nameFeild = value; }

  private _amountFeild: number = 0;
  public get amountFeild(): number { return this._amountFeild; }
  public set amountFeild(value: number) { this._amountFeild = value; }

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void { }

  AddIngredient() {
    if (this.nameFeild.trim().length != 0 && this.amountFeild > 0) {
      //console.log(this.nameFeild, this.amountFeild);
      this.shoppingListService.addIngredient(new Ingredient(this.nameFeild, this.amountFeild));
    } else {
      console.log("The feilds are required");
    }
  }

  deleteIngredient() { }
}
