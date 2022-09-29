import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient/ingredient.model';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {




  private ingredients: Ingredient[] = [new Ingredient('Olives', 2), new Ingredient('Eggs', 8)];

  recipes: Recipe[] = [
    new Recipe(1, "First recipe", "the first recipe description", "https://www.acouplecooks.com/wp-content/uploads/2021/04/Baked-Quesadilla-in-Oven-003.jpg",
      this.ingredients),
    new Recipe(2, "second recipe", "the 2nd recipe description", "https://assets.bonappetit.com/photos/62bf35ae872a6cfbb260f286/3:4/w_1800,h_2400,c_limit/0701-tj-recipe-potato-v2.jpg",
      this.ingredients)
    , new Recipe(3, "Another recipe", "the sencond recipe description", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/olive-garden-ziti-al-forno-recipe-2-1640031063.jpeg",
      this.ingredients)
  ];

  RecipeEventEmitter: Subject<Recipe[]> = new Subject();
  singleRecipeeventEmitter: Subject<Recipe> = new Subject();


  constructor() { }


  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getSingleRecipe(idInURL: string): Recipe {
    const filtered = this.recipes.filter((r: Recipe) => r.id == parseInt(idInURL));
    return filtered[0];
  }

  omitRecipe(theID: number): void {
    this.recipes = this.recipes.filter(
      (theRecipe) => theRecipe.id != theID
    );
    console.log("new List after removing: " + "\n" + this.recipes.toString());
    this.RecipeEventEmitter.next(this.recipes);
  }
  addSingleRecipe(updatedRecipe: Recipe) {
    this.recipes.push(updatedRecipe);
    this.RecipeEventEmitter.next(this.recipes.slice());
  }

  updateSingleRecipe(tmpRecipe: Recipe): void {
    let editedRecipe: Recipe[] = this.recipes.filter((ele) => ele.id !== tmpRecipe.id);
    // console.log(editedRecipe);
    // console.log("submitted ingredients array: " + tmpRecipe.ingredients);
    editedRecipe.push(tmpRecipe);
    this.recipes = editedRecipe.slice();
    this.RecipeEventEmitter.next(this.recipes.slice());
    console.log("new recipe list:\n", this.recipes);


  }


}
