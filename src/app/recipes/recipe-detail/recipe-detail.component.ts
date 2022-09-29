import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  clickedRecipe!: Recipe;
  theID!: string;
  sub!: Subscription;

  constructor(
    private recipeService: RecipesService,
    private shoppingListService: ShoppingListService,
    private currentRoute: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    // const theID: number = this.currentRoute.snapshot.params['id'];

    this.sub = this.currentRoute.params.subscribe(
      (parameters: Params) => {
        this.theID = parameters['id'];
        //console.log(typeof theID);
        if (Number.isInteger(parseInt(this.theID))) {
          this.clickedRecipe = this.recipeService.getSingleRecipe(this.theID);
          //console.log(this.clickedRecipe);
        }
      }
    );
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
    console.log("RecipeDetailsCompont destroyed ");
  }


  AddToShoppingList() {
    this.shoppingListService.toShoppingList(this.clickedRecipe.ingredients);
  }
  deleteRecipe(theID: number) {
    // console.log("Deleted Recipe ID: " + theID);
    this.recipeService.omitRecipe(theID);
    //this.router.navigate(["/recipes"]);
    this.router.navigate(["../"], { relativeTo: this.currentRoute });
  }

}
