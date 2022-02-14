import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipes$: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);
  // recipesChanged : new BehaviorSubject<Recipe[]> = new BehaviorSubject(Recipe[])
  // recipes$:Recipe[] = [];

  constructor() {
    // console.log(this.recipes$);
  }

  getRecipe(id: number) {
    return this.recipes$.getValue()[id];
  }
  setRecipes(recipes: Recipe[]) {
    return this.recipes$.next(recipes);
  }
  addRecipe(recipe: Recipe) {
    const updatedRecipes = [...this.recipes$.getValue()];
    updatedRecipes.push(recipe);
    this.recipes$.next(updatedRecipes);
  }
  updateRecipe(index: number, updatedRecipe: Recipe) {
    const updatedRecipes = [...this.recipes$.getValue()];
    updatedRecipes[index] = updatedRecipe;
    console.log(updatedRecipes);
    this.recipes$.next(updatedRecipes);
  }
  deleteRecipe(id: number) {
    const updatedRecipes = [...this.recipes$.getValue()];
    updatedRecipes.splice(id, 1);

    this.recipes$.next(updatedRecipes);
  }
  // onAddToIngredients(id: number) {
  //   const ingredients = this.recipes$.getValue()[id].ingredients;
  //   this.shoppingListService.onAddItems(ingredients);
  // }
}
