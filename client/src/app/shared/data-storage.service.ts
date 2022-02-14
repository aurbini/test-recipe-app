import { Injectable } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  //example connection string, change it to configure to your Dotnet API
  //Feel free to change it to your needs
  url = environment.url;

  constructor(
    private recipeService: RecipesService,
    private httpClient: HttpClient
  ) {}

  saveRecipes() {
    const recipes = this.recipeService.recipes$.getValue();

    this.httpClient
      .put(this.url, recipes)
      .subscribe((data) => console.log(data));
  }
  fetchRecipes() {
    return this.httpClient.get<Recipe[]>(this.url).pipe(
      map((recipes) => {
        console.log(recipes);
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredient: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
