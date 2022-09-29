import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeFormObj: FormGroup = this.fb.group({});
  theId: number = 0;
  editMode = false;

  constructor(private fb: FormBuilder, private recipesService: RecipesService, private currentRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.currentRoute.params.subscribe(
      (parameters) => {
        this.theId = parameters['id'];
        this.editMode = this.theId != null;
        this.initForm();
      }
    );
  }

  initForm() {
    let tmpRecipe: Recipe;
    let fbArray = []

    if (this.editMode == true) {
      tmpRecipe = this.recipesService.getSingleRecipe("" + this.theId);
      for (let tmpElement of tmpRecipe.ingredients) {
        fbArray.push(this.fb.group({
          ingName: new FormControl(tmpElement.name, Validators.required),
          ingAmount: new FormControl(tmpElement.amount, Validators.required)
        }));
      }
    } else {
      tmpRecipe = new Recipe(9, "", "", "", []);
    }

    this.recipeFormObj = this.fb.group({
      rIdFormElement: new FormControl(tmpRecipe.id, Validators.required),
      rNameFormElement: new FormControl(tmpRecipe.name, Validators.required),
      rDescriptionFormElement: new FormControl(tmpRecipe.description, Validators.required),
      rImageFormElement: new FormControl(tmpRecipe.imagePath, Validators.required),
      rIngArrayFormElement: this.fb.array(fbArray)
    });

    console.log(this.recipeFormObj);

  }

  OnAddIngredient() {
    const givenIngredient = this.fb.group({
      ingName: new FormControl(null),
      ingAmount: new FormControl(null)

    });
    (this.recipeFormObj.get('rIngArrayFormElement') as FormArray).push(givenIngredient);
  }

  getControls(): [] {
    // return (this.recipeFormObj.get('rIngArrayFormElement') as FormArray).controls;
    return this.recipeFormObj.value['rIngArrayFormElement'];

  }

  onSave() {

    const id = this.recipeFormObj.value['rIdFormElement'];
    const name = this.recipeFormObj.value['rNameFormElement'];
    const desc = this.recipeFormObj.value['rDescriptionFormElement'];
    const image = this.recipeFormObj.value['rImageFormElement'];
    const arrIng = (this.recipeFormObj.get('rIngArrayFormElement') as FormArray).controls;

    let ingredientList: Ingredient[] = [];
    for (let item of arrIng) {
      ingredientList.push(new Ingredient(item.value.ingName, item.value.ingAmount));
    }
    const updatedRecipe = new Recipe(id, name, desc, image, ingredientList);
    console.log(updatedRecipe);

    if (this.editMode) {
      this.recipesService.updateSingleRecipe(updatedRecipe);
    } else {
      this.recipesService.addSingleRecipe(updatedRecipe);
    }
    this.onCancel();
  }

  onCancel() {
    this.recipeFormObj.reset();
    // this.router.navigate(["/recipes", this.theId]);
    // same behaviour below:
    this.router.navigate(["../"], { relativeTo: this.currentRoute });

  }
  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeFormObj.get('rIngArrayFormElement')).removeAt(index);
  }
}
