import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipesService } from './services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipeSelected: Recipe | undefined;
  //theSub: Subscription=new Subscription();

  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.recipeService.singleRecipeeventEmitter.subscribe(
      (theRecipe: Recipe) => {
        this.recipeSelected = theRecipe;
        //console.log(this.recipeSelected);
        return this.recipeSelected
      }
    );

  }



}
