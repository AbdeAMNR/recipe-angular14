import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  in: string = 'hello';
  @ViewChild('serverNameInput') serverNameInput: ElementRef | undefined;
  //@Output() recipeWasClickedEvent = new EventEmitter();

  recipes: Recipe[] = [];
  theSub!: Subscription;
  constructor(private recipesService: RecipesService) { }


  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();

    this.theSub = this.recipesService.RecipeEventEmitter.pipe(
      map((data) => {
        return data.map((recipe) => {
          return new Recipe(recipe.id, recipe.name, recipe.description, recipe.imagePath, recipe.ingredients);
        });
      }
      )
    ).subscribe(
      (recipeList) => {
        return this.recipes = recipeList;
      }
    );
  }


  onClick() {
    alert(this.in);
    alert(this.serverNameInput?.nativeElement.value);
  }

  // recipeItemWasClicked(recipe: Recipe) {
  //   this.recipeWasClickedEvent.emit(recipe);
  // }


  ngOnDestroy(): void {
    this.theSub.unsubscribe();
  }
}


