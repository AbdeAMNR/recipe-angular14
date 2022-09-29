import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipesItems: Recipe | undefined;
  constructor(private recipesService: RecipesService, private router: Router, private currentPath: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onClickRecipeItem(SingleRecipe: Recipe) {
    //console.log(SingleRecipe);
    this.router.navigate([SingleRecipe.id], { relativeTo: this.currentPath });
    // this.recipesService.singleRecipeeventEmitter.emit(SingleRecipe);
  }

}
